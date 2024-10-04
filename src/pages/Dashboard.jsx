import AppNav from "../components/AppNav";
import styles from "./Dashboard.module.css";
function Dashboard() {
  return (
    <>
      <AppNav />
      <section className={styles.dashContent}>
        <div>
          <p>Numero de projetos</p>
          <h1>82</h1>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
