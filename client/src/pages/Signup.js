import { useEffect } from "react";
import Form from "../components/Form";
import "../assets/styles/login.css";

function Signup({ setMain }) {
  useEffect(() => setMain("login"), [setMain]);
  return (
    <section className={"form-section"}>
      <Form type={"signup"} doc={"user"} className={"login-form"} />
    </section>
  );
}
export default Signup;
