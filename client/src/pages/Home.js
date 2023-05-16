import { useQuery } from "@apollo/client";
import { QUERY_WORKOUTS } from "../utils/queries";
import WorkoutList from "../components/WorkoutList";
// import Auth from '../utils/auth';

function Home() {
  // useQuery hook makes query request
  const { loading, data } = useQuery(QUERY_WORKOUTS);

  // const defined by optional chaining
  const workouts = data?.workouts || [];

  return (
    <section>
      {loading ? (
        <div>loading...</div>
      ) : (
        <WorkoutList workouts={workouts} title="total workouts" />
      )}
    </section>
  );
}

export default Home;
