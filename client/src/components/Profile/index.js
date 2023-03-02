import "./index.css";

function Profile() {
  // placeholder variables
  const meters = [
    { name: "total", meters: 75000 },
    { name: "year", meters: 50000 },
    { name: "month", meters: 25000 },
    { name: "week", meters: 8000 },
    { name: "day", meters: 1000 },
  ];

  const dailyActivities = [
    {
      date: "2022.01.02",
      activity: "kayaking",
      meters: "800",
      adjusted: "n/a",
      notes: "popsicle shell",
    },
    {
      date: "2022.01.02",
      activity: "rowing",
      meters: "200",
      adjusted: "n/a",
      notes: "pimon, blue/green. too foggy",
    },
  ];

  return (
    <>
      {/* stats component */}
      <section className="stats">
        <h2>Current stats</h2>

        <article className="meters">
          {meters.map((distance, i) => (
            <>
              <p key={`time${i}`}>{distance.name}</p>
              <p key={`dist${i}`} className="distance">
                {distance.meters}m
              </p>
            </>
          ))}
        </article>

        <article className="graph">
          {/* circular bar graph made with meters data. */}
        </article>
      </section>

      {/* add daily log component */}
      <section className="daily-log">
        <h2>Daily log </h2>
        <button className="add-btn">+</button>

        <article className="activity-header">
          <p></p>
          <p>activity</p>
          <p>meters</p>
          <p>adjusted</p>
          <p className="display-lg">notes</p>
        </article>

        {dailyActivities.map((activity, i) => (
          <article key={`activity${i}`} className="activity">
            <p>{i + 1}</p>
            <p>{activity.activity}</p>
            <p>{activity.meters}m</p>
            <p>{activity.adjusted}</p>
            <p className="display-lg">{activity.notes}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export default Profile;
