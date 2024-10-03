import PropTypes from "prop-types";
import styles from "./AdProjectBtn.module.css";

function AdProjectBtn({ toggleVisibility }) {
  return (
    <>
      <button onClick={toggleVisibility} className={styles.newProject}>
        + Adicionar Projeto
      </button>
    </>
  );
}
export default AdProjectBtn;

AdProjectBtn.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};
