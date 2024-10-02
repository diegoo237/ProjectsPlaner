import styles from "./ProjectState.module.css";
import PropTypes from "prop-types";
import Project from "../components/project/Project";
import AdProjectBtn from "./AdProjectBtn";

function ProjectState({ station, projects, onRemoveProject }) {
  return (
    <article className={styles.container}>
      <p className={styles.state}>{station}</p>
      <AdProjectBtn />
      {projects.length > 0 ? (
        <Project projectList={projects} onRemoveProject={onRemoveProject} />
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </article>
  );
}

ProjectState.propTypes = {
  station: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  onRemoveProject: PropTypes.func.isRequired,
};

export default ProjectState;
