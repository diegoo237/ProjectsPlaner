import styles from "./Projects.module.css";
import AppNav from "../components/AppNav";
import ProjectState from "./ProjectState";
const projectStates = [
  { station: "fazendo", key: "1" },
  { station: "fazendo", key: "2" },
];

function Project() {
  return (
    <>
      <AppNav />
      <main className={styles.main}>
        {projectStates.map((station) => (
          <ProjectState station={station.station} key={station.key} />
        ))}
      </main>
    </>
  );
}

export default Project;
