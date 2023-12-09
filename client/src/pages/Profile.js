import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_STATS } from "../utils/queries";
import Auth from "../utils/auth";
import "../assets/styles/profile.css"

// query/mutation note: re-request data from server not needed. apollo client aches query results, updates cache with every mutation
function Profile({ setMain }) {
  const { username: userParam } = useParams();

  // adds variables to a `useQuery` hook to run queries with arguments
  // if there's a URL bar value in userParam, use query user. no value uses query me
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_STATS, {
    variables: { username: userParam },
  });

  // handles each type of the above response
  const user = data?.me || data?.user || {};
  const { username, weeklyGoal, remaining, ...stats } = user;
  const goals = { weeklyGoal, remaining }

  useEffect(() => setMain("profile"), [setMain])

  // navigates user to `/profile` if username is the logged in user. compares jwt username value against userParam value
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  // logged out user gets this message
  if (!user?.username) {
    return <section>Login to view this page</section>;
  }

  if (loading) {
    return <section>Loading...</section>;
  }

  // UI | user stat object key-values are mapped to keep JSX DRY
  return (
    <>
      <section id="user-goals">
      <h2>{username} goals</h2>
        {Object.entries(goals)
          .filter(([key]) => !key.startsWith("_"))
          .map(([key, value], i) => (
            <article key={i} className="goals">
              <p>{key}</p>
              <p>{value}</p>
            </article>
          ))}
      </section>

      <section id="user-stats">
        <h2>meter stats</h2>
        {Object.entries(stats)
          .filter(([key]) => !key.startsWith("_"))
          .map(([key, value], i) => (
            <article key={i} className="stats">
              <p>{key.replace("Meters", "")}</p>
              <p>{value}</p>
            </article>
          ))}
      </section>
    </>
  );
}

export default Profile;
