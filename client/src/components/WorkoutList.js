import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { formatDate } from "../utils/helpers";

function WorkoutList({ workouts, title }) {
  // conditional rendering
  const loggedIn = Auth.loggedIn();
  // const minWidth = window.innerWidth >= 768;
  const [minWidth, setMinWidth] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setMinWidth(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!workouts.length) {
    return <h2>No workouts</h2>;
  }
  // console.log(workouts)

  return (
    // logged in users see more details from the workouts query
    <>
      <h2>{title}</h2>
      <ul id="workouts">
        <li className="workout list-item" id="workout-fields">
          <h3>date</h3>
          <h3>activity</h3>
          <h3 className="workout-meters">meters</h3>
          <h3 className="workout-meters display-md">adjusted</h3>
        </li>
        {workouts &&
          workouts.map((workout, i) => (
            <li key={i} className="workout list-item">
              <p>{formatDate(workout.date)}</p>
              <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
              <p className="workout-meters">
                {loggedIn && !minWidth
                  ? `${workout.adjusted}m`
                  : `${workout.meters}m`}
              </p>
              <p className="workout-meters display-md">
                {workout.meters === workout.adjusted
                  ? "-"
                  : `${workout.adjusted}m`}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default WorkoutList;
