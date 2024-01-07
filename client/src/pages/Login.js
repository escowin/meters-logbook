import { useEffect } from "react";
import Form from "../components/Form";
import "../assets/styles/login.css";

function Login({ setMain, type }) {
  useEffect(() => setMain("login"), [setMain]);
  return (
    <section className={"form-section"}>
      <Form type={type} doc={"user"} className={"login-form"} />
    </section>
  );
}

export default Login;
