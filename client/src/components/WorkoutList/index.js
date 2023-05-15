function WorkoutList ({ workouts, title }) {
    if (!workouts.length) {
        return <h3>No workouts</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {workouts && workouts.map(workout =>
                <div key={workout._id}>
                    <p>{workout.meters}</p>
                    <p>{workout.date}</p>
                    <p>{workout.notes}</p>
                </div>
            )}
        </div>
    )
}

export default WorkoutList