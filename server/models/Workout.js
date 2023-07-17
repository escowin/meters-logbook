const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema(
  {
    activity: {
      type: String,
      required: "define the activity",
    },
    meters: {
      type: Number,
      required: "enter meters",
      minlength: 1,
      maxlength: 99999,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: "enter date",
    },
    notes: {
      type: String,
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

workoutSchema.virtual("adjusted").get(function () {
  switch (this.activity) {
    case "sup":
    case "swim":
      result = parseInt(this.meters) * 3;
      break;
    case "bike":
      result = parseInt(this.meters) * 4;
      break;
    default:
      result = parseInt(this.meters);
      break;
  }
  return result;
});
const Workout = model("Workout", workoutSchema);

module.exports = Workout;
