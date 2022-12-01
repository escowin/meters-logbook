const meters = [
  {
    week: "week 01 | 2022.11.07 - 2022.11.13",
    // might restructure monday - sunday objects as an array of objects
    monday: {
      date: "2022.11.07",
      row: 7667,
      erg: 2967 + 2695 + 2691 + 1746,
      noteRow:
        "morning practice | mark hamilton, purple-white, TRC to Red Bud to Lamar to TRC",
      noteErg:
        "afternoon practice | 14:45.0 2967m, 12:00.0 2695m, 12:00.0 2691m, 08:00.0 1746m",
    },
    tuesday: {
      date: "2022.11.08",
      row: 0,
      erg: 10000,
      noteRow: "",
      noteErg: "",
    },
    wednesday: {
      date: "2022.11.09",
      row: 7648,
      erg: 2092 + 1904 + 2574 + 2720,
      noteRow:
        "morning practice | pimon, blue-green, TRC to Red Bud to Lamar to TRC",
      noteErg:
        "afternoon practice | 10:07.2 2092m, 08:49.2 1904m, 12:00.0 2574m, 12:00.0 2720m",
    },
    thursday: {
      date: "2022.11.10",
      row: 0,
      erg: 0,
      noteRow: "rest day",
      noteErg: "",
    },
    friday: {
      date: "2022.11.11",
      row: 8460,
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
      row: 6733,
      erg: 10000,
      noteRow:
        "afternoon practice | pimon, blue-green, TRC to Mopac to Lamar to Mopac to Lamar to TRC",
      noteErg: "59:00.4 10000m",
    },
  },
  {
    week: "week 02 | 2022.11.14 - 2022.11.20",
    monday: {
      date: "2022.11.14",
      erg: 3050 + 2016 + 2060 + 1556,
      row: 0,
      noteRow: "morning rain",
      noteErg: "afternoon practice | ",
    },
    tuesday: {
      date: "2022.11.15",
      row: 0,
      erg: 10000,
      noteRow: "",
      noteErg: "",
    },
    wednesday: {
      date: "2022.11.16",
      row: 10780,
      erg: 3623 + 2327 + 2317 + 2334,
      noteRow:
        "morning practice | mixed quad, 2 seat, blue-green, 20-26spm step",
      noteErg:
        "afternoon practice | 16:12.2, 10:00.0 x3 (20spm 4min, 22spm 2min, 24spm 2min, 26spm 1min)",
    },
    thursday: {
      date: "2022.11.17",
      row: 0,
      erg: 10000,
      noteRow: "",
      noteErg: "",
    },
    friday: {
      date: "2022.11.18",
      row: 9590,
      erg: 10000,
      noteRow: "mixed quad, 2 seat, the masters, blue-green",
      noteErg: "",
    },
    saturday: {
      date: "2022.11.19",
      row: 9236,
      erg: 21030,
      noteRow: "morning practice; 24, blue-green",
      noteErg: "2 hours",
    },
    sunday: {
      date: "2022.11.20",
      row: 7255,
      erg: 9632 + 10000,
      noteRow: "",
      noteErg: "",
    },
  },
  {
    week: "week 03 | 2022.11.21 - 2022.11.27",
    monday: {
      date: "2022.11.21",
      row: 0,
      erg: 7538 + 2813 + 4654,
      noteRow: "morning practice cancelled",
      noteErg: "afternoon practice | ",
    },
    tuesday: {
      date: "2022.11.22",
      row: 0,
      erg: 1711 + 9000,
      noteRow: "",
      noteErg: "home, warmup + 9k. elevated",
    },
    wednesday: {
      date: "2022.11.23",
      row: 0,
      erg: 11715 + 12091,
      noteRow: "slept in",
      noteErg: "home, morning & late night",
    },
    thursday: {
      date: "2022.11.24",
      row: 0,
      erg: 1731 + 7016 + 2018,
      noteRow: "",
      noteErg: "home morning",
    },
    friday: {
      date: "2022.11.25",
      row: 15480 + 7684,
      erg: 0,
      noteRow: "quad, 2 seat; single, 27 (mark hamilton)",
      noteErg: "",
    },
    saturday: {
      date: "2022.11.26",
      row: 5094,
      erg: 12730,
      noteRow: "single, pimon. too many popouts underneath",
      noteErg: "evening",
    },
    sunday: {
      date: "2022.11.27",
      row: 9177,
      erg: 6181 + 8387,
      noteRow: "morning",
      noteErg: "8, port 2 seat",
    },
  },
  {
    week: "week 04 | 2022.11.28 - 2022.12.04",
    monday: {
      date: "2022.11.28",
      row: 9937,
      erg: 4419 + 3515,
      noteRow: "double, stroke seat",
      noteErg: "evening practice",
    },
    tuesday: {
      date: "2022.11.29",
      row: 0,
      erg: 6242 + 20000,
      noteRow: "",
      noteErg: "",
    },
    wednesday: {
      date: "2022.11.30",
      row: 0,
      erg: 30000,
      noteRow: "slept in",
      noteErg: "home, morning & late night",
    },
    thursday: {
      date: "2022.12.01",
      row: 0,
      erg: 30000,
      noteRow: "",
      noteErg: "home morning",
    },
    friday: {
      date: "2022.12.02",
      row: 0,
      erg: 30000,
      noteRow: "",
      noteErg: "",
    },
    saturday: {
      date: "2022.12.03",
      row: 0,
      erg: 30000,
      noteRow: "",
      noteErg: "",
    },
    sunday: {
      date: "2022.12.04",
      row: 0,
      erg: 30000,
      noteRow: "",
      noteErg: "",
    },
  },
];

module.exports = meters;
