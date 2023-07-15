const { Schema, model } = require("mongoose");
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
  const today = new Date().toISOString().slice(0, 10);
  let total = 0;
  this.workouts.forEach((workout) => {
    if (workout.date === today) {
      total += workout.meters;
    }
  });
  return total;
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
