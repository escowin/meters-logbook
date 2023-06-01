import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function WorkoutList({ workouts, title }) {
  // conditional rendering
  const loggedIn = Auth.loggedIn();

  if (!workouts.length) {
    return <h2>No workouts</h2>;
  }

  return (
    <>
      <h2>{title}</h2>
      {workouts &&
        workouts.map((workout) => (
          <article key={workout._id}>
            <Link to={`/workout/${workout._id}`}>{workout.activity}</Link>
            <p>{workout.meters}</p>
            <p>{workout.date}</p>
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
