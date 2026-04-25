const client = require('../config/twilioClient');
const { TWILIO_NUMBER, BASE_URL } = require('../config/env');
const { todayStr } = require('../utils/timeUtils');

/**
 * Triggers a phone call to the parent/patient
 * @param {Object} rem - The reminder object
 */
function makeCall(rem) {
  console.log(`[Twilio] Attempting to call ${rem.parentPhone} for reminder ${rem.id}...`);
  client.calls.create({
    to: rem.parentPhone,
    from: TWILIO_NUMBER,
    url: `${BASE_URL}/voice?id=${rem.id}`,
    statusCallback: `${BASE_URL}/status?id=${rem.id}`,
    statusCallbackEvent: ['completed'],
    statusCallbackMethod: 'POST'
  })
  .then(call => console.log(`[Twilio] Call initiated successfully! Call SID: ${call.sid}`))
  .catch(err => console.error(`[Twilio] Error initiating call:`, err));
}

/**
 * Marks the reminder as MISSED and sends an SMS to the caregiver
 * @param {Object} rem - The reminder object
 */
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

module.exports = {
  makeCall,
  finalizeMissed
};
