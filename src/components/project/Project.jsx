import styles from "./Project.module.css";
import PropTypes from "prop-types";
import OptionsBtn from "./OptionsBtn";
import dateIcon from "../../assets/dateIcon.svg";
import Tag from "./Tag";

function Project({ project, setProjectList }) {
  let tagsArray = [];

  if (project.tags) {
    tagsArray = Object.values(project.tags);
  }

  const date = new Date(project.prazo);

  // Formataando a data
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  return (
    <section key={project._id} className={styles.project}>
      <div className={styles.content}>
        <header>
          <div className={styles.tags}>
            {tagsArray.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
          <div className={styles.btnContainer}>
            <OptionsBtn setProjectList={setProjectList} project={project} />
          </div>
        </header>
        <main>
          <p className={styles.title}>{project.title}</p>
        </main>
      </div>

      <footer>
        <div className={styles.prazo}>
          <img src={dateIcon} alt="" /> {formattedDate}
        </div>
      </footer>
    </section>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  setProjectList: PropTypes.func,
};

export default Project;
