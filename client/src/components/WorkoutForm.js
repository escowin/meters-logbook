import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME } from "../utils/queries";

const WorkoutForm = () => {
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [meters, setMeters] = useState("");
  // set up Notes subdocument to handle note-related code
  // const [notes, setNotes] = useState("");
  // const [characterCount, setCharacterCount] = useState(0);

  const activities = ["row", "erg", "kayak", "sup", "bike", "jog", "swim"];

  // addWorkout runs the mutation
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      // handles cases when workouts dont yet exist
      try {
        // updates me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, workouts: [...me.workouts, addWorkout] } },
        });
      } catch (e) {
        console.warn("first workout insertion by user");
      }

      // updates thought array's cache
      const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });
      cache.writeQuery({
        query: QUERY_WORKOUTS,
        data: { workouts: [addWorkout, ...workouts] },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 50) {
      if (event.target.name === "activity") {
        setActivity(event.target.value);
      } else if (event.target.id === "date") {
        setDate(event.target.value);
      } else if (event.target.id === "meters") {
        setMeters(event.target.value);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // adds workout through the function
      await addWorkout({
        variables: {
          activity,
          date,
          meters: parseInt(meters),
        },
      });

      // clears form values
      setActivity("");
      setDate("");
      setMeters("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} id="workout-form">
      <h2>Add workout</h2>
      <fieldset>
        <legend>activity</legend>
        {activities.map((activity, i) => (
          <div key={i}>
            <input
              type="radio"
              name="activity"
              value={activity}
              onChange={handleChange}
            />
            <label htmlFor={activity}>{activity}</label>
          </div>
        ))}
      </fieldset>
      <article>
        <label htmlFor="date">date</label>
        <input
          type="date"
          id="date"
          className="input"
          value={date}
          onChange={handleChange}
        ></input>
      </article>
      <article>
        <label htmlFor="meters">meters</label>
        <input
          type="number"
          id="meters"
          className="input"
          value={meters}
          onChange={handleChange}
        ></input>
      </article>
      <button type="submit">add</button>
      {error && <span>error</span>}
    </form>
  );
};

export default WorkoutForm;
