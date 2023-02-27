// dependencies
const meters = require("./meters");

let total = [];
const initialValue = 0;

// logic | current date
function currentYear() {
  let date = new Date().getFullYear();
  return date;
}
// logic | summing up the weekly & current totals
function currentTotal(meters) {
  console.log(`
===============================
    million meter challenge
    \u00A9 ${currentYear()} Edwin M. Escobar
===============================
  `);

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
    console.log(`${date} `);
    console.log(`  Monday : ${monday} meters
  Tuesday : ${tuesday} meters
  Wednesday : ${wednesday} meters
  Thursday : ${thursday} meters
  Friday : ${friday} meters
  Saturday : ${saturday} meters
  Sunday : ${sunday} meters

  Week total :  ${week} meters
  `);
  }

  return `  Overall total : ${total.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  )} meters`;
}

console.log(currentTotal(meters));
