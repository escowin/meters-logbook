const Chance = require("chance");
const chance = new Chance();

const db = require("../config/connection");
const { User, Workout } = require("../models");

db.once("open", async () => {
  // try {
    // deletes existing data in db
    await Workout.deleteMany({});
    await User.deleteMany({});

    // create user data
    const userData = [];

    // creates 5 mock users
    for (let i = 0; i < 5; i+= 1) {
      const username = `${chance.first()}.${chance.last()}`;
      const email = chance.email()
      const password = chance.string({ length: 8, alpha: true, numeric: true })

      userData.push({ username, email, password});
    }

    const createdUsers = await User.collection.insertMany(userData);
    console.log(createdUsers)

    // creates 25 workouts
    let createdWorkouts = [];
    for (let i = 0; i < 50; i += 1) {
      const activity = chance.pickone(["kayaking", "rowing", "paddleboarding"]);

      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username, _id: userId } = createdUsers.ops[randomUserIndex];

      const meters = chance.integer({ min: 1, max: 50000 });
      const adjustedMeters = activity === "paddleboarding" ? meters * 3 : meters;
      const date = chance
      .date({ year: 2023 })
      .toISOString()
      .substring(0, 10)
      .replace(/-/g, ".");
      const notes = chance.sentence({ words: 5 });

      const createdWorkout = await Workout.create({ activity, meters, adjustedMeters, username, date, notes})

      const updatedUser = await User.updateOne(
        { _id: userId },
        { $push: { workouts: createdWorkout._id } }
      )

      createdWorkouts.push(createdWorkout);
    }
    console.log(createdWorkouts)

    console.log('database seeded');
    process.exit(0);
});
