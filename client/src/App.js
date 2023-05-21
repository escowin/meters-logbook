import {
  ApolloProvider, // special react component. provides data to all other components
  ApolloClient, // constructor function. initializes connection to graphqll api server
  InMemoryCache, // enables apollo client instance to cache api response data. lets user perform efficient requests
  createHttpLink, // controls how apollo client makes a request. middleware for outbound network requests.
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context"; // retrieves jwt everytime a graphql req is made
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // spa appears as mpa

import "./App.css";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import Page404 from "./pages/Page404";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";

// establishes connection to backend server graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const date = new Date().getFullYear();
  // consider | streamline Route return by mapping an array

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" >
              <Route path=":username" element={<Profile/>}/>
              <Route path="" element={<Profile/>}/>
            </Route>
            <Route path="/workout/:id" element={<Workout/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer date={date} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
