import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";
import ActivityForm from "../components/ActivityForm";
import "../assets/styles/home.css"

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
        <section className="user-section">
          <p>coach: something</p>
          <p>username: {userData.me.username}</p>
          <p>email: {userData.me.email}</p>
          <p>workouts: {userData.me.workouts.length}</p>
        </section>
      ) : null}
      {loggedIn && (
        <section className="form-section">
          <ActivityForm />
        </section>
      )}
      <section className="workouts-section">
        {loading ? (
          <article>loading...</article>
        ) : (
          <WorkoutList workouts={workouts} title="total workouts" />
        )}
      </section>
    </>
  );
}

export default Home;
