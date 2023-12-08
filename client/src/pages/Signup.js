import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../assets/styles/login.css";

function Signup({ setMain }) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => setMain("login"), [setMain])

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // signup form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // executes addUser mutation, passing in the variable data from form
      const { data } = await addUser({
        // ... | spread operator | object w/ key-value pairs that directly match formState object.
        variables: { ...formState },
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h2>Sign up</h2>
        <label htmlFor="username">username</label>
        <input
          name="username"
          type="username"
          id="username"
          value={formState.username}
          onChange={handleChange}
        ></input>

        <label htmlFor="email">email</label>
        <input
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        ></input>

        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
        ></input>

        <button type="submit">submit</button>
      </form>
      {error && <section>Sign up failed</section>}
    </section>
  );
}
export default Signup;
