import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function WorkoutList({ workouts, title }) {
  // conditional rendering
  const loggedIn = Auth.loggedIn();

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
          <p>date</p>
          <p>activity</p>
          <p className="workout-meters">meters</p>
        </li>
        {workouts &&
          workouts.map((workout, i) => (
            <li key={i} className="workout list-item">
              <p>{workout.date}</p>
              <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
              <p className="workout-meters">
                {loggedIn && workout.meters !== workout.adjusted
                  ? `${workout.meters}m`
                  : `${workout.adjusted}m`}
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}

export default WorkoutList;
