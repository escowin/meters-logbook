function WorkoutList({ workouts, title }) {
  if (!workouts.length) {
    return <h3>No workouts</h3>;
  }

  return (
    <>
      <h2>{title}</h2>
      {workouts &&
        workouts.map((workout) => (
          <article key={workout._id}>
            <p>{workout.meters}</p>
            <p>{workout.date}</p>
            <p>{workout.notes}</p>
          </article>
        ))}
    </>
  );
}

export default WorkoutList;
