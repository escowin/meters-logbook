import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";
import "../assets/styles/home.css";

function Home() {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const user = data?.me || {};
  const workouts = user?.workouts || [];

  if (loading) {
    <section>Loading...</section>;
  }

  return (
    <>
      {loggedIn && user?.username ? (
        <>
          <WorkoutForm initialValues={""} doc={"workout"} type={"add"}/>
          <WorkoutList workouts={workouts}/>
        </>
      ) : (
        <section>log in to view contents</section>
      )}
    </>
  );
}

export default Home;
