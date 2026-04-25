const twilio = require('twilio');
const { accountSid, authToken } = require('./env');

// Initialize the Twilio client using credentials from environment variables
const client = twilio(accountSid, authToken);

module.exports = client;
