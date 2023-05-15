import {
  ApolloProvider, // special react component. provides data to all other components
  ApolloClient, // constructor function. initializes connection to graphqll api server
  InMemoryCache, // enables apollo client instance to cache api response data. lets user perform efficient requests
  createHttpLink, // controls how apollo client makes a request. middleware for outbound network requests.
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // retrieves jwt everytime a graphql req is made
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // spa appears as mpa

import "./App.css";

// pages
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Page404 from "./pages/Page404";
// import Signup from './pages/Signup';
// import SingleWorkout from "./pages/SingleWorkout";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";
// import Profile from './components/Profile';

// establishes connection to backend server graphql endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache(), 
});


function App() {
  const date = new Date().getFullYear();

  return (
      <ApolloProvider client={client}>
          <Header />
          <main>
            <Home/>
          </main>
          <Footer date={date} />
      </ApolloProvider>
    
  );
}

export default App;
