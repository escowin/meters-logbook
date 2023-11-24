import { ADD_WORKOUT } from "./mutations";
import { QUERY_ME_BASIC } from "./queries";

export function formatDate(date) {
  return date.replace(/-/g, ".");
}

export const form = {
  workout: [
    {
      name: "activity",
      type: "radio",
      max: 10,
      radios: ["row", "erg", "kayak", "sup", "bike", "jog", "swim"],
      required: true,
    },
    { name: "date", type: "date", required: true },
    { name: "meters", type: "number", required: true, max: 9999 },
    { name: "note", type: "text", max: 180, required: false },
  ],
  login: [
    { name: "username", type: "text", required: true },
    { name: "password", type: "password", required: true },
  ],
};

export const docMutation = (doc, type) => {
  switch (doc) {
    case "workout":
      switch (type) {
        case "add":
          return ADD_WORKOUT;
        default:
          console.error(`invalid mutation: ${doc}-${type}`);
      }
      break;
    default:
      return console.error("invalid mutation");
  }
};

export const updateCache = (cache, data, type) => {
  if (type === "login") {
    return;
  }

  let { addWorkout } = data;

  // Matches server side virtual calculation
  if (addWorkout.activity === "erg" || addWorkout.activity === "row") {
    // Makes a deep copy of addWorkout to avoid modifying the original object
    addWorkout = JSON.parse(JSON.stringify(addWorkout));
    addWorkout.adjusted = addWorkout.meters;
  }

  const { me } = cache.readQuery({ query: QUERY_ME_BASIC });
  cache.writeQuery({
    query: QUERY_ME_BASIC,
    data: {
      me: {
        ...me,
        workouts: [...me.workouts, addWorkout],
      },
    },
  });
};
