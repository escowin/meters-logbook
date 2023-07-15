import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import Auth from "../utils/auth";
import "../assets/styles/workout-list.css";

function Workout() {
  const loggedIn = Auth.loggedIn();
  const { id: workoutId } = useParams();

  const { loading, data } = useQuery(QUERY_WORKOUT, {
    variables: { id: workoutId },
  });

  const workout = data?.workout || {};

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <section className="workout">
      <h2>{workout.activity} </h2>
      <article className="workout-details">
        <h3>Activity details</h3>
        {loggedIn ? (
          <>
            <p>User</p> <p>{workout.username}</p>
          </>
        ) : null}
        <p>Date</p> <p>{workout.date}</p>
        <p>Meters</p> <p>{workout.meters}m</p>
        <p>Adjusted</p>
        {workout.meters !== workout.adjusted ? (
          <p>{workout.adjusted}m</p>
        ) : (
          <p>-</p>
        )}
      </article>
      <article>
        <h3>Notes</h3>
        <p>{workout.notes}</p>
      </article>
    </section>
  );
}

export default Workout;
