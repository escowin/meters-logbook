import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import Options from "./Options";

function WorkoutList({ workouts }) {
  const options = ["edit", "delete"];
  const [editSelected, setEditSelected] = useState(false);

  if (!workouts.length) {
    return (
      <section className="list-section">
        <p>Enter a workout</p>
      </section>
    );
  }

  // bug: edit state affects all workouts
  return (
    <section className="list-section">
      <h2>Logbook</h2>
      <ul className="list" id="workouts">
        <li className="workout list-item" id="workout-fields">
          <h3>type</h3>
          <h3>date</h3>
          <h3 className="meters">meters</h3>
          <h3 className="adjusted">adjusted</h3>
          <h3 className="note display-lg">notes</h3>
          <h3 className="note display-lg options">options</h3>
        </li>
        {workouts.map((workout, i) => (
          <li key={i} className="workout item">
            {!editSelected ? (
              <>
                <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
                <p>{formatDate(workout.date)}</p>
                <p className="meters">{workout.meters}m</p>
                <p className="adjusted">
                  {workout.meters === workout.adjusted
                    ? ""
                    : `${workout.adjusted}m`}
                </p>
                <p className="note display-lg">{workout.notes}</p>
              </>
            ) : (
              console.log(editSelected)
            )}
            <div className="display-lg options">
              {options.map((option, i) => (
                <Options
                  key={i}
                  type={option}
                  doc={"workout"}
                  _id={workout._id}
                  setEditSelected={setEditSelected}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WorkoutList;
