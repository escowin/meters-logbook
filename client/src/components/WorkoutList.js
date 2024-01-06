import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import Options from "./Options";
import Form from "./Form";

function WorkoutList({ workouts }) {
  const options = ["edit", "delete"];
  const [editStates, setEditStates] = useState(workouts.map(() => false));

  // Prevents multiple edit form components from rendering in the browser.
  const handleEditClick = (index) => {
    const newEditStates = Array(editStates.length).fill(false);
    newEditStates[index] = true;
    setEditStates(newEditStates);
  };

  if (!workouts.length) {
    return (
      <section className="list-section">
        <p>Enter a workout</p>
      </section>
    );
  }

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
          <h3 className="options display-lg">options</h3>
        </li>
        {workouts.map((workout, i) => (
          <li key={i} className="workout item">
            {!editStates[i] ? (
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
                <div className="display-lg options">
                  {options.map((option, j) => (
                    <Options
                      key={j}
                      type={option}
                      doc={"workout"}
                      _id={workout._id}
                      handleEditClick={() => handleEditClick(i)}
                    />
                  ))}
                </div>{" "}
              </>
            ) : (
              <Form
                initialValues={workout}
                setEditStates={setEditStates}
                doc={"workout"}
                type={"edit"}
                className={"edit-form"}
                index={i}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WorkoutList;
