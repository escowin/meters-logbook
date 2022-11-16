const meters = [
  {
    week: "week one | 2022.11.07 - 2022.11.13",
    monday: {
      date: "2022.11.07",
      row: 0,
      erg: 2967 + 2695 + 2691 + 1746,
      noteRow:
        "morning practice | mark hamilton, purple-white, TRC to Red Bud to Lamar to TRC",
      noteErg:
        "afternoon practice | 14:45.0 2967m, 12:00.0 2695m, 12:00.0 2691m, 08:00.0 1746m",
    },
    tuesday: {
      date: "2022.11.08",
      erg: 10000,
      row: 0,
      noteRow: "",
      noteErg: "",
    },
    wednesday: {
      date: "2022.11.09",
      row: 0,
      erg: 2092 + 1904 + 2574 + 2720,
      noteRow:
        "morning practice | pimon, blue-green, TRC to Red Bud to Lamar to TRC",
      noteErg:
        "afternoon practice | 10:07.2 2092m, 08:49.2 1904m, 12:00.0 2574m, 12:00.0 2720m",
    },
    thursday: {
      date: "2022.11.10",
      erg: 0,
      row: 0,
      noteRow: "rest day",
      noteErg: "",
    },
    friday: {
      date: "2022.11.11",
      row: 0,
      erg: 10000,
      noteRow:
        "morning practice | mixed quad, 2 seat, TRC to Red Bud to Lamar to Mopac to TRC",
      noteErg: "59:00.4 10000m",
    },
    saturday: {
      date: "2022.11.12",
      row: 0,
      erg: 10000,
      noteRow: "",
      noteErg: "51:52.1 10000m",
    },
    sunday: {
      date: "2022.11.13",
      row: 0,
      erg: 10000,
      noteRow:
        "afternoon practice | pimon, blue-green, TRC to Mopac to Lamar to Mopac to Lamar to TRC",
      noteErg: "59:00.4 10000m",
    },
  },
  {
    week: "week two | 2022.11.14 - 2022.11.20",
    monday: {
      date: "2022.11.14",
      row: 0,
      erg: 0,
      noteRow: "morning rain",
      noteErg: "afternoon practice | ",
    },
    tuesday: {
      date: "2022.11.15",
      erg: 10000,
      row: 0,
      noteRow: "",
      noteErg: "",
    },
    wednesday: {
      date: "2022.11.16",
      row: 10780,
      erg: 0,
      noteRow:
        "morning practice | mixed quad, 2 seat, blue-green, 20-26spm step",
      noteErg: "afternoon practice | ",
    },
  },
];
// console.log(meters[0].days[0].total)

// function weeklyResult(data) {
//     console.log(data)
// }

function currentResults(meters) {
  for (let i = 0; i < meters.length; i++) {
    console.log(meters[i].monday);
    // weeklyResult(meters[i])
  }
}
currentResults(meters);
