import PropTypes from "prop-types";
import styles from "./AdProjectForm.module.css";
function AdProjectForm({ isVisible }) {
  return (
    <div className={isVisible ? styles.addProjectForm : "invisible"}>
      <form>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </form>
    </div>
  );
}
export default AdProjectForm;

AdProjectForm.propTypes = {
  isVisible: PropTypes.bool,
};
