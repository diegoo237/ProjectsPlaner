import styles from "./TrashBtn.module.css";
import trashIcon from "../../assets/trashIcon.svg";
import PropTypes from "prop-types";

function TrashBtn({ toggleVisibility }) {
  return (
    <button onClick={toggleVisibility} className={styles.btn}>
      <img src={trashIcon} /> Excluir
    </button>
  );
}

TrashBtn.propTypes = {
  toggleVisibility: PropTypes.func,
};

export default TrashBtn;
