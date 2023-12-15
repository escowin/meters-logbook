import { useEffect } from "react";
import Form from "../components/Form";
import "../assets/styles/login.css";

function Signup({ setMain }) {
  useEffect(() => setMain("login"), [setMain]);
  return (
    <>
      <Form type={"signup"} doc={"user"} className={"login-form"} />
    </>
  );
}
export default Signup;
