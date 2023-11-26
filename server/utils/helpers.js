const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

function getWeek(date) {
  const firstDayOfYear = dayjs(date).startOf("year");
  // Sets the week to start on Monday and end on Sunday
  const daysSinceFirstDay = dayjs(date)
    .isoWeekday(1)
    .isoWeekday(7)
    .diff(firstDayOfYear, "day");
  // Calculates the week number
  const weekNumber = Math.floor(daysSinceFirstDay / 7) + 1;

  return weekNumber;
}

function getDates(currentWeek) {
  console.log(currentWeek)
  let arr = [];
  // get Mon - Sun date strings, push to arr
  return arr
}

// formats timestamps to YYYY-MM-DD
function dateFormat(timestamp) {
  const dateObj = dayjs(timestamp);
  const formattedTimeStamp = dateObj.format("YYYY-MM-DD ddd hh:mm a");

  return formattedTimeStamp;
}

module.exports = { getWeek, dateFormat, getDates };