const Chance = require("chance");

// const db = require('../config/connection');
// const { User, Workout } = require('../models');

// db.once('open', async () => {
//     // deletes existing data in db
//   await Workout.deleteMany({});
//   await User.deleteMany({});

//   // create user data
//   const userData = [];

//   console.log('all done!');
//   process.exit(0);
// });

const chance = new Chance();

// users
const mockUser = {
  username: `${chance.first()}.${chance.last()}`,
  email: chance.email(),
  password: chance.string({ length: 8, alpha: true, numeric: true }),
};

// workouts
const activity = chance.pickone(["kayaking", "rowing", "paddleboarding"]);
const meters = chance.integer({ min: 1, max: 50000 });
const adjustedMeters = activity === "paddleboarding" ? meters * 3 : meters;

const mockWorkout = {
  _id: activity,
  meters,
  adjustedMeters,
  username: chance.word({ syllables: 2 }),
  date: chance
    .date({ year: 2023 })
    .toISOString()
    .substring(0, 10)
    .replace(/-/g, "."),
  createdAt: new Date().toISOString(),
};
console.log(mockWorkout);
