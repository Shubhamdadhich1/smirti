const cron = require('node-cron');
const reminders = require('../data/reminders');
const { nowHHMM, addMinutes, todayStr } = require('../utils/timeUtils');
const { makeCall, finalizeMissed } = require('./twilioService');

function triggerCall(rem) {
  rem.attempts += 1;
  rem.inProgress = true;
  rem.status = 'CALLING';
  makeCall(rem);
}

/**
 * Starts the cron job to check for reminders every minute.
 */
function startScheduler() {
  cron.schedule('* * * * *', () => {
    const now = new Date();
    const currentTime = nowHHMM();
    const day = now.getDay();
    const date = now.getDate();
    const today = todayStr();

    reminders.forEach(rem => {
      // If we already evaluated this to a final state today, skip
      if (rem.lastStatusDate === today) return;

      // Reset state for a new day
      if (rem.lastStatusDate && rem.lastStatusDate !== today) {
        rem.status = 'PENDING';
        rem.attempts = 0;
        rem.nextAttemptAt = null;
        rem.inProgress = false;
        rem.lastStatusDate = null;
      }

      // If a call is ongoing or we are waiting for a retry delay, skip the initial trigger
      if (rem.inProgress) return;

      let shouldTrigger = false;

      // Determine if it should trigger based on the repeat configuration
      if (rem.repeatType === 'daily') shouldTrigger = rem.time === currentTime;
      if (rem.repeatType === 'weekly') shouldTrigger = rem.daysOfWeek.includes(day) && rem.time === currentTime;
      if (rem.repeatType === 'monthly') shouldTrigger = rem.dayOfMonth == date && rem.time === currentTime;
      if (rem.repeatType === 'once') {
        shouldTrigger = rem.specificDate === today && rem.time === currentTime;
      }

      // Initial trigger for the configured time
      if (shouldTrigger && rem.attempts === 0) {
        triggerCall(rem);
        return;
      }

      // Retry mechanism if nextAttemptAt has been reached
      if (rem.nextAttemptAt && now >= new Date(rem.nextAttemptAt)) {
        if (rem.attempts < rem.maxAttempts) triggerCall(rem);
        else finalizeMissed(rem);
      }
    });
  });
}

module.exports = {
  startScheduler
};
