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

  console.log(userData)

  return (
    <>
      {" "}
      {loggedIn && userData ? (
        <section className="user-section">
          <h2>Home view</h2>
          <p>Welcome, {userData.me.username}</p>
          <p>workouts: {userData.me.workouts.length}</p>
          <p>total: {userData.me.totalMeters}m</p>
        </section>
      ) : null}
      {loggedIn && (
        <section className="form-section">
          <WorkoutForm />
        </section>
      )}
      <section className="workouts-section">
        {loading ? (
          <article>loading...</article>
        ) : (
          <WorkoutList workouts={workouts} title="all users workouts" />
        )}
      </section>
    </>
  );
}

export default Home;
