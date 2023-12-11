import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import "../assets/styles/workout.css";

function Workout({ setMain }) {
  const { id: workoutId } = useParams();
  const { loading, data } = useQuery(QUERY_WORKOUT, {
    variables: { id: workoutId },
  });
  const workout = data?.workout || {};

  useEffect(() => setMain("workout"), [setMain]);

  // to-do: implement edit & delete options

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <>
      <section id="workout">
        <h2>{workout.activity} </h2>
        <p>Date</p> <p>{workout.date}</p>
        <p>Meters</p> <p>{workout.meters}m</p>
        <p>Adjusted</p>
        {workout.meters !== workout.adjusted ? (
          <p>{workout.adjusted}m</p>
        ) : (
          <p>-</p>
        )}
        <p>Notes</p>
        <p>{workout.notes}</p>
      </section>
      <section id="options">
        <button onClick={() => console.log("edit")}>edit</button>
        <button onClick={() => console.log("delete")}>delete</button>
      </section>
    </>
  );
}

export default Workout;
