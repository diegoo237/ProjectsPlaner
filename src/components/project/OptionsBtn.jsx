import PropTypes from "prop-types";
import trashICon from "../../assets/trashICon.svg";
import tagIcon from "../../assets/tagIcon.svg";
import pointIcon from "../../assets/pointsIcon.svg";
import styles from "./OptionsBtn.module.css";
import { useState } from "react";

function OptionsBtn({ onRemoveProject, projectKey }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };
  return (
    <>
      <button onClick={toggleVisibility} className={styles.btn}>
        <img src={pointIcon} alt="" />
      </button>

      <ul className={isVisible ? styles.options : "invisible"}>
        <li>
          <button className={styles.btn}>
            <img src={tagIcon} /> Tag
          </button>
        </li>
        <li>
          <button
            onClick={() => onRemoveProject(projectKey)}
            className={styles.btn}
          >
            <img src={trashICon} /> Excluir
          </button>
        </li>
      </ul>
    </>
  );
}
export default OptionsBtn;

OptionsBtn.propTypes = {
  onRemoveProject: PropTypes.func.isRequired,
  projectKey: PropTypes.number.isRequired,
  toggleVisibility: PropTypes.func,
  isVisible: PropTypes.func,
};
