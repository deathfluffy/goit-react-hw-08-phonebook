import { NavLink } from "react-router-dom";


const LoggedNav = () => {
  return (
    <ul>
      <li>
        <NavLink to="login">LogIn</NavLink>
      </li>
      <li>
        <NavLink to="register">Register</NavLink>
      </li>
    </ul>
  );
};

export default LoggedNav;