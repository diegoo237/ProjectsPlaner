import styles from "./Project.module.css"; // Adicione a importação de estilos
import PropTypes from "prop-types";

function Project({ projectList, onRemoveProject }) {
  return (
    <>
      {projectList.map((project) => (
        <aside key={project.key} className={styles.project}>
          <div className={styles.content}>
            <span className={styles.tag}>{project.tag}</span>
            <div>
              <p className={styles.title}>{project.title}</p>
            </div>
          </div>
          <div className={styles.prazo}>{project.prazo}</div>
          <button onClick={() => onRemoveProject(project.key)}>Remover</button>
        </aside>
      ))}
    </>
  );
}

Project.propTypes = {
  projectList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
      tag: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      prazo: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveProject: PropTypes.func.isRequired,
};

export default Project;
