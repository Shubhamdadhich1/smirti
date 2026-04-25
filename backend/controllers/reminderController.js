const twilio = require('twilio');
const reminders = require('../data/reminders');
const { finalizeMissed } = require('../services/twilioService');
const { addMinutes, todayStr } = require('../utils/timeUtils');

/**
 * Handles missing a response during a call sequence and manages retries
 * @param {Object} rem - The reminder object
 */
function handleNoResponse(rem) {
  rem.inProgress = false;
  if (rem.attempts < rem.maxAttempts) {
    rem.nextAttemptAt = addMinutes(new Date(), 1);
  } else {
    finalizeMissed(rem);
  }
}

/**
 * Creates a new reminder and adds it to the list
 */
function createReminder(req, res) {
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
    specificDate: specificDate || null,
    status: 'PENDING',
    attempts: 0,
    maxAttempts: 2,
    nextAttemptAt: null,
    inProgress: false,
    lastStatusDate: null
  };

  reminders.push(reminder);
  res.json({ success: true, id: reminder.id });
}

/**
 * Returns all active reminders
 */
function getReminders(req, res) {
  res.json(reminders);
}

/**
 * Webhook handler for Twilio call status events
 */
function callStatusWebhook(req, res) {
  const rem = reminders.find(r => r.id == req.query.id);
  // If reminder no longer exists just acknowledge
  if (!rem) return res.sendStatus(200);

  // If status is not TAKEN following the call, process retries
  if (rem.status !== 'TAKEN') {
    handleNoResponse(rem);
  }

  res.sendStatus(200);
}

/**
 * Webhook handler for initial TWIML generation when parent answers
 */
function callVoiceWebhook(req, res) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const rem = reminders.find(r => r.id == req.query.id);
  
  if (!rem) {
      twiml.say("Sorry, an error occurred.");
      twiml.hangup();
      return res.type('text/xml').send(twiml.toString());
  }

  const gather = twiml.gather({ numDigits: 1, action: `/gather?id=${rem.id}`, method: 'POST' });

  if (rem.language === 'en') {
    gather.say(`Hello ${rem.parentName}. Take ${rem.medicine}. Press 1.`);
  } else {
    gather.say({ voice: 'Polly.Aditi', language: 'hi-IN' }, `Namaste ${rem.parentName}. ${rem.medicine} dava lein. 1 dabaiye.`);
  }

  // Fallback if they don't press anything
  twiml.hangup();
  res.type('text/xml').send(twiml.toString());
}

/**
 * Webhook handler for user pressing a digit during the call
 */
function callGatherWebhook(req, res) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const rem = reminders.find(r => r.id == req.query.id);

  if (req.body.Digits === '1' && rem) {
    rem.status = 'TAKEN';
    rem.inProgress = false;
    rem.nextAttemptAt = null;
    rem.lastStatusDate = todayStr();
    
    if (rem.language === 'en') {
        twiml.say("Thank you. Goodbye.");
    } else {
        twiml.say({ voice: 'Polly.Aditi', language: 'hi-IN' }, "Dhanyavad. Alvida.");
    }
  }

  res.type('text/xml').send(twiml.toString());
}

module.exports = {
  createReminder,
  getReminders,
  callStatusWebhook,
  callVoiceWebhook,
  callGatherWebhook
};
