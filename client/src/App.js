import React, { useState } from "react";
import {
  ApolloProvider, // special react component. provides data to all other components
  ApolloClient, // constructor function. initializes connection to graphqll api server
  InMemoryCache, // enables apollo client instance to cache api response data. lets user perform efficient requests
  createHttpLink, // controls how apollo client makes a request. middleware for outbound network requests.
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // retrieves jwt everytime a graphql req is made
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // spa appears as mpa
import "./assets/styles/App.css";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
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

// first parameter not used for this const, underscore serves as a placeholder
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // security | combining auth & httplink objects allows every request to retrieve jwt & sets req headders before making api request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const date = new Date().getFullYear();
  const [main, setMain] = useState("");


  return (
    <ApolloProvider client={client}>
      {/* components for client-side routing */}
      <Router>
        <Header />
        <main id={`${main}-page`}>
        {/* <main id={`${loggedIn ? "main-login" : "main"}`}> */}
          <Routes>
            {/* uses url parameters in React Router for dynamic page content */}
            <Route path="/" element={<Home setMain={setMain} />} />
            <Route path="/profile">
              <Route path=":username" element={<Profile setMain={setMain}/>} />
              <Route path="" element={<Profile setMain={setMain} />} />
            </Route>
            <Route path="/workout/:id" element={<Workout setMain={setMain} />} />
            <Route path="/login" element={<Login setMain={setMain} type={"login"}/>} />
            <Route path="/signup" element={<Login setMain={setMain} type={"signup"}/>} />
            <Route path="*" element={<Page404 setMain={setMain} />} />
          </Routes>
        </main>
        <Footer date={date} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
