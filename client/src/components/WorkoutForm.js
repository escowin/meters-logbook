import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutations";

function WorkoutForm() {
  // useMutation
  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // adds workout to database
      // await addWorkout({
      //   variables: { activity, meters, adjustedMeters, date, notes },
      // });

      // clears form values
      // setText("");
      // setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Add workout</h2>
      <label htmlFor="activity">activity</label>
      <input type="text" id="activity"></input>
      <label htmlFor="date">date</label>
      <input type="date" id="date"></input>
      <label htmlFor="meters">meters</label>
      <input type="number" id="meters"></input>
      <label htmlFor="notes">notes</label>
      <input type="text" id="notes"></input>
      <button type="submit">add</button>
    </form>
  );
}

export default WorkoutForm;
