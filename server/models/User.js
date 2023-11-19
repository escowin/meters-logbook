const { Schema, model } = require("mongoose");
const { getWeek } = require("../utils/helpers");
const dayjs = require('dayjs')
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    weeklyGoal: {
      type: Number,
      required: false,
    },
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("totalMeters").get(function () {
  let total = 0;
  this.workouts.forEach((workout) => (total += workout.meters));
  return total;
});

userSchema.virtual("dailyMeters").get(function () {
  let total = 0;
  const today = new Date().toISOString().slice(0, 10);
  this.workouts.forEach((workout) => {
    if (workout.date === today) {
      total += workout.meters;
    }
  });
  return total;
});

userSchema.virtual("monthlyMeters").get(function () {
  let total = 0;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  this.workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);
    const workoutYear = workoutDate.getFullYear();
    const workoutMonth = workoutDate.getMonth() + 1;

    if (workoutYear === year && workoutMonth === month) {
      total += workout.meters;
    }
  });

  return total;
});

userSchema.virtual("weeklyMeters").get(function () {
  let total = 0;
  const currentDate = dayjs();
  const year = currentDate.year();
  const week = getWeek(currentDate);

  // const date = new Date();
  // const year = date.getFullYear();
  // const week = getWeek(date);

  this.workouts.forEach((workout) => {
    const workoutDate = dayjs(workout.date);
    const workoutYear = workoutDate.year();
    const workoutWeek = getWeek(workoutDate);

    // const workoutDate = new Date(workout.date);
    // const workoutYear = workoutDate.getFullYear();
    // const workoutWeek = getWeek(workoutDate);
    console.log(`${workout.date} is week: ${workoutWeek}`)
    if (workoutYear === year && workoutWeek === week) {
      total += workout.meters;
    }
  });

  return total;
});

userSchema.virtual("remaining").get(function () {
  if (!this.weeklyGoal) {
    return 0
  }
  const result = this.weeklyGoal - this.weeklyMeters
  return result;
})

// middleware | presaves to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compares incoming password with pashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
