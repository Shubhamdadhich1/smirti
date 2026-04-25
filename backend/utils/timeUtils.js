/**
 * Returns current time in HH:MM format
 */
function nowHHMM() {
  return new Date().toTimeString().slice(0, 5);
}

/**
 * Adds specified minutes to a given date object
 * @param {Date} date - The original date
 * @param {number} m - Minutes to add
 * @returns {Date} The new date object
 */
function addMinutes(date, m) {
  return new Date(date.getTime() + m * 60000);
}

/**
 * Returns today's date in YYYY-MM-DD format
 */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

module.exports = {
  nowHHMM,
  addMinutes,
  todayStr,
};
