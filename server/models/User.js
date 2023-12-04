const { Schema, model } = require("mongoose");
const { getWeek, getDates } = require("../utils/helpers");
const dayjs = require("dayjs");
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
  const today = dayjs().format("YYYY-MM-DD");

  this.workouts.forEach((workout) => {
    if (dayjs(workout.date).format("YYYY-MM-DD") === today) {
      total += workout.meters;
    }
  });
  return total;
});

userSchema.virtual("monthlyMeters").get(function () {
  let total = 0;
  const currentDate = dayjs();
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  this.workouts.forEach((workout) => {
    const workoutDate = dayjs(workout.date);
    const workoutYear = workoutDate.year();
    const workoutMonth = workoutDate.month() + 1;

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

  this.workouts.forEach((workout) => {
    const workoutDate = dayjs(workout.date);
    const workoutYear = workoutDate.year();
    const workoutWeek = getWeek(workoutDate);

    if (workoutYear === year && workoutWeek === week) {
      total += workout.meters;
    }
  });

  return total;
});

userSchema.virtual("remaining").get(function () {
  if (!this.weeklyGoal) {
    return 0;
  }
  const result = this.weeklyGoal - this.weeklyMeters;
  return result;
});

// Breaks does this week's meters by days
userSchema.virtual("weeklyBreakdown").get(function () {
  // Gets the current week, year, and an array of dates for this week
  const currentWeek = getWeek(dayjs());
  const currentYear = dayjs().year();
  const dates = getDates(currentWeek, currentYear);

  // Initializes an empty array to store daily breakdowns
  let arr = [];

  // Iterates through the dates array and filter workouts for each date, summing up meters
  for (let i = 0; i < dates.length; i++) {
    // Filters workouts for the current date and calculate the sum of meters
    const result = this.workouts
      .filter((workout) => workout.date === dates[i])
      .reduce((totalMeters, workout) => totalMeters + workout.meters, 0);

    // Formats the date to get the day of the week
    const dayOfTheWeek = dayjs(dates[i]).format("ddd");

    // Creates a string in the format "<day>: <meters>" and pushes it to the array
    arr.push(`${dayOfTheWeek}: ${result}`);
  }

  // Joins the array elements into a string separated by newline characters, returning the result
  return arr.join("\n");
});

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
