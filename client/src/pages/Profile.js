import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";

function Profile() {
  const { username: userParam } = useParams();
  //   adds variables to a `useQuery` hook to run queries with arguments
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  const user = data?.user || {};

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <>
      <section>
        <h2>{user.username}'s profile</h2>
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
