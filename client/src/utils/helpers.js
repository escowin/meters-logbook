import { ADD_WORKOUT } from "./mutations";

export function formatDate(date) {
  return date.replace(/-/g, '.');
}

export const form = {
  workout: [
    { name: "date", type: "date", required: true },
    { name: "meters", type: "number", required: true, max: 9999 },
    {
      name: "activity",
      type: "radio",
      max: 10,
      radios: ["row", "erg", "kayak", "sup", "bike", "jog", "swim"],
      required: true,
    },
    { name: "note", type: "text", max: 180, required: false },
  ],
  login: [
    { name: "username", type: "text", required: true },
    { name: "password", type: "password", required: true },
  ]
}

export const docMutation = (doc, type) => {
  switch (doc) {
    case "workout":
      switch (type) {
        case "add":
          return ADD_WORKOUT;
        default:
          console.error(`invalid mutation: ${doc}-${type}` )
      }
      break;
    default:
      return console.error("invalid mutation");
  }
};