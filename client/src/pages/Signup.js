import './forms.css';

function Signup() {
  return (
    <form className="signup-form">
      <h2>Sign up</h2>
      <label htmlFor="username">username</label>
      <input name="username"></input>

      <label htmlFor="email">email</label>
      <input name="email"></input>

      <label htmlFor="password">password</label>
      <input name="password"></input>

      <button type="submit">submit</button>
    </form>
  );
}

export default Signup;
