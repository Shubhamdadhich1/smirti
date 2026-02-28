

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const BASE_URL = process.env.BASE_URL;

if (!accountSid || !authToken || !TWILIO_NUMBER || !BASE_URL) {
  console.error("ENV ERROR");
  process.exit(1);
}

const client = twilio(accountSid, authToken);

let reminders = [];

function nowHHMM() {
  return new Date().toTimeString().slice(0,5);
}

function addMinutes(date, m) {
  return new Date(date.getTime() + m*60000);
}

function todayStr() {
  return new Date().toISOString().slice(0,10);
}

// ---------- CREATE ----------
app.post('/schedule', (req, res) => {
  const { parentName, parentPhone, medicine, time, caregiverPhone, language, repeatType, daysOfWeek, dayOfMonth, specificDate } = req.body;

  const reminder = {
    id: Date.now(),
    parentName,
    parentPhone,
    medicine,
    time,
    caregiverPhone,
    language: language || 'hi',
    repeatType: repeatType || 'daily',
    daysOfWeek: daysOfWeek || [],
    dayOfMonth: dayOfMonth || null,
    specificDate: specificDate || null, // NEW
    status: 'PENDING',
    attempts: 0,
    maxAttempts: 2,
    nextAttemptAt: null,
    inProgress: false,
    lastStatusDate: null
  };

  reminders.push(reminder);
  res.json({ success: true });
});

app.get('/reminders', (req, res) => res.json(reminders));

// ---------- SCHEDULER ----------
cron.schedule('* * * * *', () => {
  const now = new Date();
  const currentTime = nowHHMM();
  const day = now.getDay();
  const date = now.getDate();
  const today = todayStr();

  reminders.forEach(rem => {

    if (rem.lastStatusDate === today) return;

    if (rem.lastStatusDate && rem.lastStatusDate !== today) {
      rem.status = 'PENDING';
      rem.attempts = 0;
      rem.nextAttemptAt = null;
      rem.inProgress = false;
      rem.lastStatusDate = null;
    }

    if (rem.inProgress) return;

    let shouldTrigger = false;

    if (rem.repeatType === 'daily') shouldTrigger = rem.time === currentTime;

    if (rem.repeatType === 'weekly') shouldTrigger = rem.daysOfWeek.includes(day) && rem.time === currentTime;

    if (rem.repeatType === 'monthly') shouldTrigger = rem.dayOfMonth == date && rem.time === currentTime;

    // NEW: specific date
    if (rem.repeatType === 'once') {
      shouldTrigger = rem.specificDate === today && rem.time === currentTime;
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
  rem.lastStatusDate = todayStr();

  client.messages.create({
    to: rem.caregiverPhone,
    from: TWILIO_NUMBER,
    body: `Alert: ${rem.parentName} missed medicine.`
  });
}

app.post('/status', (req, res) => {
  const rem = reminders.find(r => r.id == req.query.id);
  if (!rem) return res.sendStatus(200);

  if (rem.status !== 'TAKEN') handleNoResponse(rem);

  res.sendStatus(200);
});

app.post('/voice', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const rem = reminders.find(r => r.id == req.query.id);

  const gather = twiml.gather({ numDigits: 1, action: `/gather?id=${rem.id}`, method: 'POST' });

  if (rem.language === 'en') gather.say(`Hello ${rem.parentName}. Take ${rem.medicine}. Press 1.`);
  else gather.say({ voice: 'Polly.Aditi', language: 'hi-IN' }, `Namaste ${rem.parentName}. ${rem.medicine} dava lein. 1 dabaiye.`);

  twiml.hangup();

  res.type('text/xml').send(twiml.toString());
});

app.post('/gather', (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const rem = reminders.find(r => r.id == req.query.id);

  if (req.body.Digits === '1' && rem) {
    rem.status = 'TAKEN';
    rem.inProgress = false;
    rem.nextAttemptAt = null;
    rem.lastStatusDate = todayStr();
  }

  res.type('text/xml').send(twiml.toString());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});