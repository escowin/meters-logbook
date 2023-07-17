import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";
import "../assets/styles/home.css";

function Home() {
  // useQuery hook makes query request
  const { loading, data } = useQuery(QUERY_WORKOUTS);

  // const defined by optional chaining
  const workouts = data?.workouts || [];

  // conditional rendering
  const loggedIn = Auth.loggedIn();

  // destructured data object is the useQuery hook's response
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  return (
    <>
      {" "}
      {loggedIn && userData ? (
        <>
          <section className="user-section">
            <h2>{userData.me.username} stats</h2>
            <p>
              <span>total</span> 
              <span>{userData.me.totalMeters}m</span>
            </p>
            <p>
              <span>monthly</span>
              <span>{userData.me.monthlyMeters}m</span></p>
            <p>
              <span>weekly</span>
              <span>{userData.me.weeklyMeters}m</span>
            </p>
            <p>
              <span>daily</span>
              <span>{userData.me.dailyMeters}m</span>
            </p>
          </section>
          <section className="form-section">
            <WorkoutForm />
          </section>
        </>
      ) : null}
      <section className="workouts-section">
        {loading ? (
          <article>loading...</article>
        ) : (
          <WorkoutList workouts={workouts} title="latest activity" />
        )}
      </section>
    </>
  );
}

export default Home;
