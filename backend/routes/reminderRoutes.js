const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Creation of a new reminder
router.post('/schedule', reminderController.createReminder);

// Fetching all reminders for UI display
router.get('/reminders', reminderController.getReminders);

// Twilio webhooks
// (Note: Twilio requires exact callback URLs. We mount these routes at / or /api based on the BASE_URL env.)
// Based on old server.js, these were mapped directly to the root path without /api
router.post('/status', reminderController.callStatusWebhook);
router.post('/voice', reminderController.callVoiceWebhook);
router.post('/gather', reminderController.callGatherWebhook);

module.exports = router;
