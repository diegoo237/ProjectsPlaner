import styles from "./Project.module.css";
import PropTypes from "prop-types";
import OptionsBtn from "./OptionsBtn";
import dateIcon from "../../assets/dateIcon.svg";
import Tag from "./Tag";

function Project({ project }) {
  let tagsArray = [];

  if (project.tags) {
    tagsArray = Object.values(project.tags);
  }

  return (
    <section key={project._id} className={styles.project}>
      <div className={styles.content}>
        <header>
          <div className={styles.tags}>
            {tagsArray.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>

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
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Project;
