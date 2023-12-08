import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../assets/styles/login.css";

function Login({ setMain }) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  useEffect(() => setMain("login"), [setMain]);

  // updates state on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handles form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      // redirects to homepage after login
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h2 className="header">Login</h2>

        <label htmlFor="username">username</label>
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
        />

        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />

        <button type="submit">submit</button>
      </form>
      {error && <section>Login failed</section>}
    </section>
  );
}

export default Login;
