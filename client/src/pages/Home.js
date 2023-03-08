import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_WORKOUTS } from '../utils/queries';
import Auth from '../utils/auth';

function Home() {
  // query req via hook
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const { data: userData } = useQuery(QUERY_ME);

  const workouts = data?.workouts || [];

  // conditional render for logged in user
  const loggedIn = Auth.loggedIn();

  return (
    <>
        <h1>homepage</h1>
    </>
  )
}

export default Home;