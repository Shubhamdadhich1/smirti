require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT||3000;

// Twilio Config
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const BASE_URL = process.env.BASE_URL;


// In-memory DB
let reminders = [];

// Helpers
function nowHHMM() {
  return new Date().toTimeString().slice(0,5);
}
function addMinutes(date, m) {
  return new Date(date.getTime() + m*60000);
}

// ---------- CREATE REMINDER WITH REPEAT ----------
app.post('/schedule', (req, res) => {
  const { parentName, parentPhone, medicine, time, caregiverPhone, language, repeatType, daysOfWeek, dayOfMonth } = req.body;

  if (!parentName || !parentPhone || !medicine || !time || !caregiverPhone) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const reminder = {
    id: Date.now(),
    parentName,
    parentPhone,
    medicine,
    time,
    caregiverPhone,

    language: language || 'hi',

    // NEW: repeat config
    repeatType: repeatType || 'daily', // daily | weekly | monthly
    daysOfWeek: daysOfWeek || [], // [0-6]
    dayOfMonth: dayOfMonth || null,

    status: 'PENDING',
    attempts: 0,
    maxAttempts: 2,
    nextAttemptAt: null,
    lastCalledAt: null,
    inProgress: false
  };

  reminders.push(reminder);
  res.json({ success: true, reminder });
});

app.get('/reminders', (req, res) => res.json(reminders));

// ---------- SCHEDULER ----------
cron.schedule('* * * * *', () => {
  const now = new Date();
  const currentTime = nowHHMM();
  const day = now.getDay();
  const date = now.getDate();

  reminders.forEach(rem => {
    if (rem.status === 'TAKEN' || rem.status === 'MISSED') {
      // reset for next cycle
      if (rem.repeatType !== 'once') {
        rem.status = 'PENDING';
        rem.attempts = 0;
      }
    }

    if (rem.inProgress) return;

    let shouldTrigger = false;

    if (rem.repeatType === 'daily') {
      shouldTrigger = (rem.time === currentTime);
    }

    if (rem.repeatType === 'weekly') {
      shouldTrigger = (rem.daysOfWeek.includes(day) && rem.time === currentTime);
    }

    if (rem.repeatType === 'monthly') {
      shouldTrigger = (rem.dayOfMonth === date && rem.time === currentTime);
    }

    if (shouldTrigger && rem.attempts === 0) {
      triggerCall(rem);
      return;
    }

    if (rem.nextAttemptAt && now >= new Date(rem.nextAttemptAt)) {
      if (rem.attempts < rem.maxAttempts) triggerCall(rem);
      else finalizeMissed(rem);
    }
  });
});

function triggerCall(rem) {
  rem.attempts += 1;
  rem.inProgress = true;
  rem.status = 'CALLING';
  rem.lastCalledAt = new Date();

  makeCall(rem);
}

function makeCall(rem) {
  client.calls.create({
    to: rem.parentPhone,
    from: TWILIO_NUMBER,
    url: `${BASE_URL}/voice?id=${rem.id}`,
    statusCallback: `${BASE_URL}/status?id=${rem.id}`,
    statusCallbackEvent: ['completed'],
    statusCallbackMethod: 'POST'
  });
}

function handleNoResponse(rem) {
  rem.inProgress = false;
  if (rem.attempts < rem.maxAttempts) {
    rem.nextAttemptAt = addMinutes(new Date(), 1);
  } else {
    finalizeMissed(rem);
  }
}

function finalizeMissed(rem) {
  rem.status = 'MISSED';
  rem.inProgress = false;
  rem.nextAttemptAt = null;

  client.messages.create({
    to: rem.caregiverPhone,
    from: TWILIO_NUMBER,
    body: `Alert: ${rem.parentName} missed medicine.`
  });
}

// ---------- STATUS ----------
app.get('/status', (req, res) => res.send('OK'));

app.post('/status', (req, res) => {
  const rem = reminders.find(r => r.id == req.query.id);
  if (!rem) return res.sendStatus(200);

  if (rem.status === 'TAKEN') return res.sendStatus(200);

  handleNoResponse(rem);
  res.sendStatus(200);
});

// ---------- VOICE ----------
app.get('/voice', (req, res) => {
  res.type('text/xml');
  res.send('<Response><Say>OK</Say></Response>');
});

app.post('/voice', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const id = req.query.id;
  const rem = reminders.find(r => r.id == id);

  const gather = twiml.gather({ numDigits: 1, action: `/gather?id=${id}`, method: 'POST' });

  const name = rem?.parentName || 'aap';
  const med = rem?.medicine || 'dawa';
  const lang = rem?.language || 'hi';

  const hi = `Namaste ${name}. Kripya apni ${med} lein. 1 dabaiye.`;
  const en = `Hello ${name}. Please take your ${med}. Press 1.`;

  if (lang === 'en') gather.say({ voice: 'alice', language: 'en-US' }, en);
  else gather.say({ voice: 'Polly.Aditi', language: 'hi-IN' }, hi);

  twiml.hangup();

  res.type('text/xml');
  res.send(twiml.toString());
});

// ---------- GATHER ----------
app.post('/gather', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const id = req.query.id;
  const rem = reminders.find(r => r.id == id);

  if (req.body.Digits === '1' && rem) {
    rem.status = 'TAKEN';
    rem.inProgress = false;
    rem.nextAttemptAt = null;

    const name = rem.parentName;
    const med = rem.medicine;

    if (rem.language === 'en') twiml.say(`Thank you ${name}. You have taken your ${med}.`);
    else twiml.say({ voice: 'Polly.Aditi', language: 'hi-IN' }, `Dhanyavaad ${name}. Aapne ${med} le li hai.`);
  } else {
    twiml.say('Invalid input');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on ${PORT}`));

