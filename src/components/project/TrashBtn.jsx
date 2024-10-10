import styles from "./TrashBtn.module.css";
import trashIcon from "../../assets/trashIcon.svg";

function TrashBtn() {
  return (
    <button className={styles.btn}>
      <img src={trashIcon} /> Excluir
    </button>
  );
}

export default TrashBtn;
