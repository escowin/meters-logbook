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
    { name: "note", type: "text", max: 180, required: false },
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
        workouts: [addWorkout, ...me.workouts],
      },
    },
  });
};

// Carries out conditional action following a succesful mutation from the client side
export const postMutation = (type, navigate, setEditSelected, data) => {
  if (type === "login" || type === "sign-up") {
    type === "login"
      ? Auth.login(data.login.token)
      : Auth.login(data.addUser.token);
  } else {
    // type === "add" ? navigate("/") : setEditSelected(false);
  }
};
