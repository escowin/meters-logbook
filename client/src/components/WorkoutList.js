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
      {workouts &&
        workouts.map((workout) => (
          <article key={workout._id}>
            <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
            <p>{workout.date}</p>
            <p>
              {workout.meters}m{" "}
              {loggedIn && workout.meters !== workout.adjustedMeters ? (
                <span className="adjustedMeters">({workout.adjustedMeters}m)</span>
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
          </article>
        ))}
    </>
  );
}

export default WorkoutList;
