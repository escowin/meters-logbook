import { Link } from "react-router-dom";

function WorkoutList({ workouts, title }) {
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
            <p>{workout.notes}</p>
            <Link to={`/profile/${workout.username}`}>{workout.username}</Link>
            {""}
          </article>
        ))}
    </>
  );
}

export default WorkoutList;
