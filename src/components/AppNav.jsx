import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/home">
        <h2>Logo</h2>
      </NavLink>
      <ul className={styles.ul}>
        <NavLink to="/dashboard">
          <h3>Dashboard</h3>
        </NavLink>
        <NavLink to="/projects">
          <h3>Projetos</h3>
        </NavLink>
      </ul>
    </nav>
  );
}
export default AppNav;
