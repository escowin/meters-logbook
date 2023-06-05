import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME } from "../utils/queries";

const WorkoutForm = () => {
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [meters, setMeters] = useState("");
  const [notes, setNotes] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const activities = ["row", "erg", "kayak", "paddleboard", "cycle", "jog"];

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
    switch (activity) {
      case "paddleboarding":
        adjustedMeters = parseInt(meters) * 3;
        break;
      default:
        adjustedMeters = parseInt(meters);
        break;
    }

    try {
      // adds workout through the function
      await addWorkout({
        variables: {
          activity,
          date,
          meters: parseInt(meters),
          adjustedMeters,
          notes,
        },
      });

      // clears form values
      setActivity("");
      setDate("");
      setMeters("");
      setNotes("");
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Add workout</h2>

      <label htmlFor="activity">activity</label>

      <select
        type="text"
        id="activity"
        className="input"
        value={activity}
        onChange={handleChange}
      >
        {activities.map((activity, i) => (
          <option key={i} value={activity}>
            {activity}
          </option>
        ))}
      </select>

      <label htmlFor="date">date</label>
      <input
        type="date"
        id="date"
        className="input"
        value={date}
        onChange={handleChange}
      ></input>

      <label htmlFor="meters">meters</label>
      <input
        type="number"
        id="meters"
        className="input"
        value={meters}
        onChange={handleChange}
      ></input>

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
        className="input"
        value={notes}
        onChange={handleChange}
        maxLength={50}
      ></textarea>

      <button type="submit">add</button>
    </form>
  );
};

export default WorkoutForm;
