import PropTypes from "prop-types";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav({ logout }) {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <h2>Logo</h2>
      </NavLink>
      <ul className={styles.ul}>
        <NavLink to="/dashboard">
          <h3>Dashboard</h3>
        </NavLink>
        <NavLink to="/projects">
          <h3>Planer</h3>
        </NavLink>
        <h3 onClick={logout}>Log-out</h3>
      </ul>
    </nav>
  );
}
export default AppNav;
AppNav.propTypes = {
  logout: PropTypes.func.isRequired,
};
