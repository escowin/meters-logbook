import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

function WorkoutList({ workouts }) {
  if (!workouts.length) {
    return (
      <section>
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
          <h3 className="adjusted display-md">adjusted</h3>
        </li>
        {workouts.map((workout, i) => (
          <li key={i} className="workout item">
            <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
            <p>{formatDate(workout.date)}</p>
            <p className="meters">{workout.meters}m</p>
            <p className="adjusted display-md">
              {workout.meters === workout.adjusted
                ? "-"
                : `${workout.adjusted}m`}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WorkoutList;
