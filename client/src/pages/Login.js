import './forms.css';

function Login() {
  return (
    <form className="login-form">
      <h2 className="header">Login</h2>

      <label htmlFor="username">username</label>
      <input name="username"></input>

      <label htmlFor="password">password</label>
      <input name="password"></input>

      <button type="submit">submit</button>
    </form>
  );
}

export default Login;
