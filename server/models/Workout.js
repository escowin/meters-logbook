const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema(
  {
    activity: {
      type: String,
      required: "define the activity",
      minlength: 1,
      maxlength: 20,
    },
    meters: {
        type: Number,
        required: "enter meters",
        minlength: 1,
        maxlength: 99999999,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
        type: String,
        required: "enter date"
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
