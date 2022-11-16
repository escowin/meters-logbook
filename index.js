const meters = [
    {
        week: "week one",
        days: [
            {
                day: "monday",
                erg: 2967 + 2695 + 2691 + 1746,
                row: 0,
                note: "afternoon practice | 14:45.0 2967m, 12:00.0 2695m, 12:00.0 2691m, 08:00.0 1746m"
            },
            { day: "tuesday", erg: 10000, row: 0, note: ""},
            { day: "wednesday", erg: 0, row: 0, note: ""},
            { day: "thursday", erg: 0, row: 0, note: ""},
            { day: "friday", erg: 0, row: 0, note: ""},
        ]
    }
]
// console.log(meters[0].days[0].total)

function currentResults(meters) {
    for (let i = 0; i < meters.length; i++) {
        console.log(meters[i])
    }
};
currentResults(meters)

function tuesday() {
    const a = 10000
    week.push(a);
    console.log(`tuesday ${a}`)
}

function wednesday() {
    const a = 2092; // - 10:07.2 2092m
    const b = 1904; // - 08:49.2 1904m
    const c = 2574; // - 12:00.0 2574m
    const d = 2720; // - 12:00.0 2720m
    
    const day = a + b + c + d
    week.push(day)
    console.log(`wednesday ${day}`)
}

function friday() {
    const a = 10000; // - 59:00.4 10000m
    week.push(a)
    console.log(`friday ${a}`)
}

function saturday() {
    const a = 10000 // - 51:52.1 10000m
    week.push(a)
    console.log(`saturday ${a}`)
}

function weeklyTotal(){
    monday();
    tuesday();
    wednesday();
    friday();
    saturday();
    let sum = week.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    console.log(`
    ${sum} erg meters total`)
};

// weeklyTotal();

// rowing
// 2022.11.07 monday morning
// - single, 1 lap (TRC to Red Bud to Lamar return to TRC)
// - mark hamilton (skinny oars unavailable)

// 2022.11.09 wednesday morning
// - single, 1 lap (TRC to Red Bud to Lamar return to TRC)
// - pimon

// 2022.11.10 friday morning
// - mixed quad*, 1 lap (TRC to Red Bud to Lamar to Mopac to TRC).
// - seats: 1 Helen, 2 Me, 3 Nancy, 4 Eileen

// 2022.11.13 sunday afternoon
// - single, 2 laps  (Mopac to Lamar return to Mopac)
// - pimon