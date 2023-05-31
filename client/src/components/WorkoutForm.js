import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";

function WorkoutForm() {
  const [notes, setNotes] = useState("");
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [meters, setMeters] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // addWorkout runs the mutation
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 80) {
      if (event.target.id === "activity") {
        setActivity(event.target.value);
      } else if (event.target.id === "date") {
        setDate(event.target.value);
      } else if (event.target.id === "meters") {
        setMeters(event.target.value);
      } else if (event.target.id === "notes") {
        setNotes(event.target.value);
        setCharacterCount(event.target.value.length);
      }
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let adjustedMeters;
    switch(activity) {
      case "paddleboarding":
        adjustedMeters = meters * 3;
        break;
      default:
        adjustedMeters = meters;
        break;
    }

    const formObj = {
      activity,
      date,
      meters,
      adjustedMeters,
      notes,
    };
    console.log(formObj);

    try {
      // adds workout through the function
      await addWorkout({
        variables: { ...formObj },
      });

      //   // clears form values
      //   setText("");
      //   setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Add workout</h2>

      <label htmlFor="activity">activity</label>
      <input type="text" id="activity" value={activity} onChange={handleChange}></input>

      <label htmlFor="date">date</label>
      <input type="date" id="date" value={date} onChange={handleChange}></input>

      <label htmlFor="meters">meters</label>
      <input type="number" id="meters" value={meters} onChange={handleChange}></input>

      <label htmlFor="notes">
        notes
        <span
          className={`char ${characterCount === 50 || error ? "max" : "min"}`}
        >
          {characterCount}/50
          {error && <span>error</span>}
        </span>
      </label>
      <textarea
        type="text"
        id="notes"
        value={notes}
        onChange={handleChange}
        maxLength={50}
      ></textarea>

      <button type="submit">add</button>
    </form>
  );
}

export default WorkoutForm;
