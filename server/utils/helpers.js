function getWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const daysSinceFirstDay = Math.round((date - firstDayOfYear) / (24 * 60 * 60 * 1000 ))
    // Adjust to start the week on Monday
    const daysSinceFirstMonday = daysSinceFirstDay - (firstDayOfYear.getDay() + 6) % 7 + 1;
    return Math.ceil(daysSinceFirstMonday / 7);
}

module.exports = { getWeek }