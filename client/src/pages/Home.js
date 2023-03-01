import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function Home() {
  // query req via hook
  const { loading, data } = useQuery(QUERY_ME);

  // conditional render for logged in user
  const loggedIn = Auth.loggedIn();

  return (
    <>
        <h1>homepage</h1>
    </>
  )
}

export default Home;