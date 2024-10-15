import PropTypes from "prop-types";
import TagBtn from "./TagBtn";
import TrashBtn from "./TrashBtn";
import styles from "./OptionForm.module.css";

function OptionForm({ isVisible, componentRef, projectKey }) {
  return (
    <div
      ref={componentRef}
      className={isVisible ? styles.options : "invisible"}
    >
      <h1>titulo</h1>
      <span>
        <TrashBtn projectkey={projectKey} />
        <TagBtn projectkey={projectKey} />
        <p>Station</p>
      </span>
      <p>Descriçao do projeto</p>
      <textarea></textarea>
      <p>Alterar Data</p>
      <input type="date"></input>
      <button className={styles.btn}>Save</button>
    </div>
  );
}

export default OptionForm;

OptionForm.propTypes = {
  projectKey: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  componentRef: PropTypes.object,
};
