import styles from "./ProjectState.module.css";
import PropTypes from "prop-types";

function ProjectState({ station }) {
  console.log(station);
  return (
    <article className={styles.container}>
      <h2>{station}</h2>
      <button className={styles.newProject}>+ Adicionar Projeto</button>
      <aside>
        <div className={styles.project}>teste</div>
        <div className={styles.prazo}>Prazo</div>
      </aside>
    </article>
  );
}
ProjectState.propTypes = {
  station: PropTypes.string,
};
export default ProjectState;
