import { useEffect } from "react";
import Form from "../components/Form";
import "../assets/styles/login.css";

function Login({ setMain }) {
  useEffect(() => setMain("login"), [setMain]);
  return (
    <>
      <Form type={"login"} doc={"user"} className={"login-form"} />
    </>
  );
}

export default Login;
