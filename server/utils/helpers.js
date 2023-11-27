const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

// Returns the current week of the year
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

// Returns an array of this week's dates
function getDates(currentWeek, year) {
  // Calculates the first day of the week (using - 1 temp solution to get correct start date)
  const firstDay = dayjs()
    .year(year)
    .isoWeek(currentWeek - 1)
    .startOf("isoWeek");
  // Generates an array of dates for the week
  const weekDates = Array.from({ length: 7 }, (_, i) => firstDay.add(i, "day"));
  // Formats the dates as YYYY-MM-DD strings
  const formattedDates = weekDates.map((date) => date.format("YYYY-MM-DD"));
  console.log(formattedDates);
  return formattedDates;
}

// Formats timestamps to YYYY-MM-DD
function dateFormat(timestamp) {
  const dateObj = dayjs(timestamp);
  const formattedTimeStamp = dateObj.format("YYYY-MM-DD ddd hh:mm a");

  return formattedTimeStamp;
}

module.exports = { getWeek, dateFormat, getDates };
