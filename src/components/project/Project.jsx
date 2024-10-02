import styles from "./Project.module.css"; // Adicione a importação de estilos
import PropTypes from "prop-types";
import OptionsBtn from "./OptionsBtn";
import dateIcon from "../../assets/dateIcon.svg";

function Project({ projectList, onRemoveProject }) {
  return (
    <>
      {projectList.map((project) => (
        <section key={project.key} className={styles.project}>
          <div className={styles.content}>
            <header>
              <span className={styles.tag}>{project.tag}</span>
              <OptionsBtn
                projectKey={project.key}
                onRemoveProject={onRemoveProject}
              />
            </header>
            <main>
              <p className={styles.title}>{project.title}</p>
            </main>
          </div>

          <footer>
            <div className={styles.prazo}>
              <img src={dateIcon} alt="" /> {project.prazo}
            </div>
          </footer>
        </section>
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
