function ActivityForm() {
  return (
    <form>
      <h2>Add activity</h2>
      <label htmlFor="activity">activity</label>
      <input type="text" id="activity"></input>
      <label htmlFor="date">date</label>
      <input type="date" id="date"></input>
      <label htmlFor="meters">meters</label>
      <input type="number" id="meters"></input>
      <button type="submit">add</button>
    </form>
  );
}

export default ActivityForm;
