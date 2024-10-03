import PropTypes from "prop-types";
import styles from "./AdProjectForm.module.css";
function AdProjectForm({ isVisible, componentRef, onAddProject }) {
  const handleAddProject = (e) => {
    e.preventDefault();
    const title = document.getElementById("projectTitle").value;
    const prazo = document.getElementById("date").value;

    onAddProject({ title, prazo });
  };

  return (
    <form
      ref={componentRef}
      className={isVisible ? styles.addProjectForm : "invisible"}
      onSubmit={handleAddProject}
    >
      <div className={styles.row}>
        <label>Titulo do Projeto</label>
        <input id="projectTitle" />
      </div>

      <div className={styles.row}>
        <label>Prazo para conclusao</label>
        <input id="date" type="number" />
      </div>

      <div className={styles.buttons}>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
export default AdProjectForm;

AdProjectForm.propTypes = {
  isVisible: PropTypes.bool,
  componentRef: PropTypes.object,
  onAddProject: PropTypes.func.isRequired,
};
