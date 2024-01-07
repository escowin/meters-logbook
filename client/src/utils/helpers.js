import { USER, WORKOUT } from "./mutations";
import { QUERY_ME_BASIC } from "./queries";
import Auth from "./auth";

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
    { name: "notes", type: "text", max: 180, required: false },
  ],
  login: [
    { name: "username", type: "text", required: true },
    { name: "password", type: "password", required: true },
  ],
  signup: [
    { name: "username", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "password", type: "password", required: true },
  ],
};

export const docMutation = (doc, type) => {
  switch (doc) {
    case "workout":
      switch (type) {
        case "add":
          return WORKOUT.ADD_WORKOUT;
        case "delete":
          return WORKOUT.DELETE_WORKOUT;
        case "edit":
          return WORKOUT.EDIT_WORKOUT;
        default:
          console.error(`invalid mutation: ${doc}-${type}`);
      }
      break;
    case "user":
      switch (type) {
        case "login":
          return USER.LOGIN_USER;
        case "signup":
          return USER.ADD_USER;
        case "edit":
          return USER.EDIT_USER;
        default:
          console.error(`invalid mutation: ${doc}-${type}`);
      }
      break;
    default:
      return console.error("invalid mutation");
  }
};

export const updateCache = (cache, data, type, _id) => {
  // reads data object from cache
  const { me } = cache.readQuery({ query: QUERY_ME_BASIC });

  switch (type) {
    case "add":
      let { addWorkout } = data;

      // Matches server side virtual calculation
      if (addWorkout.activity === "erg" || addWorkout.activity === "row") {
        // Makes a deep copy of addWorkout to avoid modifying the original object
        addWorkout = JSON.parse(JSON.stringify(addWorkout));
        addWorkout.adjusted = addWorkout.meters;
      }

      cache.writeQuery({
        query: QUERY_ME_BASIC,
        data: {
          me: {
            ...me,
            workouts: [addWorkout, ...me.workouts],
          },
        },
      });
      break;
    case "edit":
      console.log("edit cache tbd");
      break;
    case "delete":
      // removes deleted job from job app array
      const updatedWorkouts = me.workouts.filter(
        (workout) => workout._id !== _id
      );
      // writes updated query_me data to cache
      cache.writeQuery({
        query: QUERY_ME_BASIC,
        data: {
          me: {
            ...me,
            workouts: updatedWorkouts,
            // implement logic to match server-side virtuals
          },
        },
      });
      break;
    default:
      return;
  }
};

// Carries out conditional action following a succesful mutation from the client side
export const postMutation = (type, setEditStates, data, index) => {
  switch (type) {
    case "login":
      Auth.login(data.login.token);
      break;
    case "signup":
      Auth.login(data.addUser.token);
      break;
    case "edit":
      // Updates a specific item in the state array using the state-setting function provided by useState.
      setEditStates((prevEditStates) => {
        const newEditStates = [...prevEditStates];
        newEditStates[index] = !newEditStates[index];
        return newEditStates;
      });
      break;
    default:
      console.log(type + ": post mutation tbd");
      return;
  }
};
