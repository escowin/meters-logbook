import { Link } from "react-router-dom";
import "./index.css";

function Header() {
  const navLinks = [
    {
      name: "home",
      path: "home"
    },
    {
      name: "profile",
      path: "profile"
    },
    {
      name: "log in",
      path: "login"
    },
    {
      name: "sign up",
      path: "signup"
    },
  ]

  return (
    <header>
      <Link to="/">
        <h1>Logbook</h1>
      </Link>

      <nav>
        <ul className="links">
          {navLinks.map((navLink, i) => (
            <li key={i}>
              <Link to={`/${navLink.path}`}>
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
