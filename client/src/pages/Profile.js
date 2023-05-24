import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_CREWMATE } from "../utils/mutations";
import Auth from "../utils/auth";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

// query/mutation note: re-request data from server not needed. apollo client aches query results, updates cache with every mutation
function Profile() {
  const [addCrewmate] = useMutation(ADD_CREWMATE);
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

  const handleClick = async (e) => {
    try {
      await addCrewmate({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <section className="user-section">
        <h2>{userParam ? `${user.username}'s` : "your"} profile</h2>
        <p>{user.email}</p>
        {/* renders only in `/profile/:username` */}
        {userParam && <button onClick={handleClick}>add crewmate</button>}
      </section>
      {!userParam && (
        <section className="form-section">
          <WorkoutForm/>
        </section>
      )}
      <section className="workouts-section">
        <WorkoutList
          workouts={user.workouts}
          title={`${user.username}'s workouts:`}
        />
      </section>
    </>
  );
}

export default Profile;
