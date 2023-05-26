import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";

function WorkoutForm() {
  const [notes, setNotes] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // addWorkout runs the mutation
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 80) {
      setNotes(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // adds workout through the function
      await addWorkout({
        variables: { notes },
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
      <input type="text" id="activity"></input>

      <label htmlFor="date">date</label>
      <input type="date" id="date"></input>

      <label htmlFor="meters">meters</label>
      <input type="number" id="meters"></input>

      <label htmlFor="notes">
        notes
        <span
          className={`${characterCount === 80 || error ? "text-error" : ""}`}
        >
          {characterCount}/80
          {error && <span>error</span>}
        </span>
      </label>
      <input type="text" id="notes" value={notes} onChange={handleChange}></input>

      <button type="submit">add</button>
    </form>
  );
}

export default WorkoutForm;
