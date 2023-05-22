import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_WORKOUT } from "../utils/queries";
import "../assets/styles/workout.css";

function Workout() {
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
      <h2>
        {workout.date} : {workout.activity}
      </h2>
      <p>User</p>
      <p>{workout.username}</p>
      <p>Meters</p>
      <p>{workout.meters}m</p>
      <p>adjusted</p>
      <p>{workout.adjustedMeters}m</p>
      <p>Notes</p>
      <p>{workout.notes}</p>
    </section>
  );
}

export default Workout;
