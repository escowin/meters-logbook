function getWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const daysSinceFirstDay = Math.round((date - firstDayOfYear) / (24 * 60 * 60 * 1000 ))
    return Math.ceil((firstDayOfYear.getDay() + daysSinceFirstDay + 1) / 7)
}

module.exports = {getWeek}