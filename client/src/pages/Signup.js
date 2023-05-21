import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
import "../assets/styles/forms.css";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // const [addUser, { error }] = useMutation(ADD_USER);

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
  };

  return (
    <form className="signup-form" onSubmit={handleFormSubmit}>
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
  );
}
export default Signup;
