import styles from "./ProjectsPage.module.css";
import AppNav from "../components/AppNav";
import ProjectState from "../components/ProjectState";

// lista de status de projeto Ex (Fazendo)
const projectStates = [
  { station: "A fazer", key: "1" },
  { id: "fazendo", station: "Fazendo", key: "2" },
  { station: "Aguardando", key: "3" },
  { station: "Concluido", key: "4" },
];

function ProjectPage() {
  return (
    <>
      <AppNav />
      <main className={styles.main}>
        {projectStates.map((station) => (
          <ProjectState
            station={station.station}
            key={station.key}
            id={station.id}
          />
        ))}
      </main>
    </>
  );
}

export default ProjectPage;
