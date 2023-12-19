import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";
import Form from "../components/Form";
import "../assets/styles/home.css";

function Home({ setMain }) {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const user = data?.me || {};
  const workouts = user?.workouts || [];

  useEffect(() => setMain("home"), [setMain])

  if (loading) {
    <section>Loading...</section>;
  }

  return (
    <>
      {loggedIn && user?.username ? (
        <>
          <Form initialValues={""} doc={"workout"} type={"add"} className={"add-form"}/>
          <WorkoutList workouts={workouts}/>
        </>
      ) : (
        <section className="message">log in to view contents</section>
      )}
    </>
  );
}

export default Home;
