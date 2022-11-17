// dependencies
const meters = require('./meters');

// logic | summing up the weekly & current totals
function currentTotal(meters) {
  let total = [];
  const initialValue = 0;

  for (let i = 0; i < meters.length; i++) {
    let date = meters[i].week;
    const monday = meters[i].monday.row + meters[i].monday.erg;
    const tuesday = meters[i].tuesday.row + meters[i].tuesday.erg;
    const wednesday = meters[i].wednesday.row + meters[i].wednesday.erg;
    const thursday = meters[i].thursday.row + meters[i].thursday.erg;
    const friday = meters[i].friday.row + meters[i].friday.erg;
    const saturday = meters[i].saturday.row + meters[i].saturday.erg;
    const sunday = meters[i].sunday.row + meters[i].sunday.erg;

    let week =
      monday + tuesday + wednesday + thursday + friday + saturday + sunday;
    total.push(week);
    console.log(`${date} : ${week} meters`);
  }

  return `
total :  ${total.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  )} meters
  `;
}
console.log(currentTotal(meters));
