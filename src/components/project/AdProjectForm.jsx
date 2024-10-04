import PropTypes from "prop-types";
import { useRef } from "react";
import styles from "./AdProjectForm.module.css";
function AdProjectForm({ isVisible, componentRef, onAddProject }) {
  const titleRef = useRef(null);
  const dateRef = useRef(null);

  const handleAddProject = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const prazo = dateRef.current.value;

    onAddProject({ title, prazo });
  };

  return (
    <form
      ref={componentRef}
      className={isVisible ? styles.addProjectForm : "invisible"}
      onSubmit={handleAddProject}
    >
      <div className={styles.row}>
        <label htmlFor="projectTitle">Titulo do Projeto</label>
        <input id="projectTitle" ref={titleRef} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Prazo para conclusao</label>
        <input id="date" type="date" ref={dateRef} />
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
