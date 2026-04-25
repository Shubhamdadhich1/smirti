require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 3000;

if (!accountSid || !authToken || !TWILIO_NUMBER || !BASE_URL) {
  console.error("ENV ERROR: Missing required environment variables.");
  process.exit(1);
}

module.exports = {
  accountSid,
  authToken,
  TWILIO_NUMBER,
  BASE_URL,
  PORT,
};
