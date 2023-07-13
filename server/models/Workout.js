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

workoutSchema.virtual("adjusted").get(function() {
    switch (this.activity) {
      case "paddleboarding":
        adjustedMeters = parseInt(meters) * 3;
        break;
      default:
        adjustedMeters = parseInt(meters);
        break;
    }
})
const Workout = model("Workout", workoutSchema);

module.exports = Workout;
