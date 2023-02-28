function SignUp() {
  return (
    <form className="signup-form">
      <label htmlFor="username">username</label>
      <input name="username"></input>

      <label htmlFor="email">email</label>
      <input name="email"></input>

      <label htmlFor="password">password</label>
      <input name="password"></input>

      <button type="submit">
        sign up
      </button>
    </form>
  );
}

export default SignUp