import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // retrieves jwt everytime a graphql req is made
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // spa appears as mpa

// spa mimicing mpa to do | sort out components & pages. pages get the react router treatment 
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from './components/Profile';
import Signup from './pages/Signup';
import SingleWorkout from "./pages/SingleWorkout";

// establishes a new graphql server link
const httpLink = createHttpLink({
  uri: "/graphql",
});

// configures auth link to includes jwt in header in graphql reqs regardless if its needed or not.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// instantiates apollo client & creates the api endpoint connection
const client = new ApolloClient({
  link: authLink.concat(httpLink), // request retrieves jwt and sets the request headers before making the req to the api
  cache: new InMemoryCache(), // instantiates cache object
});

function App() {
  const date = new Date().getFullYear();

  return (
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/profile'>
                <Route path=':username' element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route> */}
              <Route path="/login" element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/workout/:id" element={<SingleWorkout />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer date={date} />
        </Router>
      </ApolloProvider>
    
  );
}

export default App;
