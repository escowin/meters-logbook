import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function WorkoutList({ workouts, title }) {
  // conditional rendering
  const loggedIn = Auth.loggedIn();

  if (!workouts.length) {
    return <h2>No workouts</h2>;
  }

  return (
    // logged in users see more details from the workouts query
    <>
      <h2>{title}</h2>
      <ul className="workout-legend">
        <li>activity</li>
        <li>date</li>
        <li>meters</li>
      </ul>

      <ul className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <li
              key={workout._id}
              className={`workout ${loggedIn ? "workout-max" : "workout-min"}`}
            >
              <Link to={`/workout/${workout._id}`} className="activity">
                <h3>{workout.activity}</h3>
              </Link>
              <p>{workout.date}</p>
              <p className="meters">
                {workout.meters}m
                {loggedIn && workout.meters !== workout.adjusted ? (
                  <span className="adjustedMeters">
                    ({workout.adjusted}m)
                  </span>
                ) : null}
              </p>
              {loggedIn ? (
                <>
                  <p>{workout.notes}</p>
                  <Link to={`/profile/$workout.username}`}>
                    {workout.username}
                  </Link>
                </>
              ) : null}
              {""}
            </li>
          ))}
      </ul>
    </>
  );
}

export default WorkoutList;
