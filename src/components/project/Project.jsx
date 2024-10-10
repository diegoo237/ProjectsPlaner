import styles from "./Project.module.css";
import PropTypes from "prop-types";
import OptionsBtn from "./OptionsBtn";
import dateIcon from "../../assets/dateIcon.svg";

function Project({ project }) {
  return (
    <>
      <section key={project._id} className={styles.project}>
        <div className={styles.content}>
          <header>
            <span className={project.tag ? styles.tag : ""}>{project.tag}</span>
            <OptionsBtn projectKey={project._id} />
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
    </>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Project;
