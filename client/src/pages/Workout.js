import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import Auth from "../utils/auth";
import "../assets/styles/workout.css"

function Workout({ setMain }) {
  const loggedIn = Auth.loggedIn();
  const { id: workoutId } = useParams();
  const { loading, data } = useQuery(QUERY_WORKOUT, {
    variables: { id: workoutId },
  });
  const workout = data?.workout || {};

  useEffect(() => setMain("workout"), [setMain])

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <>
      <section id="workout">
        <h2>{workout.activity} </h2>
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
      </section>
      <section id="note-section">
        <h2>Notes</h2>
        <p>{workout.notes}</p>
      </section>
    </>
  );
}

export default Workout;
