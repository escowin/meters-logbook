import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";

function Profile() {
  const { username: userParam } = useParams();

  // adds variables to a `useQuery` hook to run queries with arguments
  // if there's a URL bar value in userParam, use query user. no value uses query me
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // handles each type of the above response
  const user = data?.me || data?.user || {};

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

  return (
    <>
      <section>
        <h2>{userParam ? `${user.username}'s` : "your"} profile</h2>
        <p>{user.email}</p>
      </section>
      <section>
        <WorkoutList
          workouts={user.workouts}
          title={`${user.username}'s workouts:`}
        />
      </section>
    </>
  );
}

export default Profile;
