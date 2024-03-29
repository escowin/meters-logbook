import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Header() {
  const navLinks = [
    {
      name: "home",
      path: "",
    },
    {
      name: "stats",
      path: "profile",
    },
  ];

  const logout = e => {
    e.preventDefault();
    Auth.logout();
  };
  
  return (
    <header>
      <Link to="/">
        <h1>Logbook</h1>
      </Link>

      <nav>
        <ul className="links">
          {Auth.loggedIn() ? (
            <>
              {navLinks.map((navLink, i) => (
                <li key={i}>
                  <Link to={`/${navLink.path}`}>{navLink.name}</Link>
                </li>
              ))}
              <a href="/" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
