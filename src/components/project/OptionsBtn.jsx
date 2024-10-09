import PropTypes from "prop-types";
import trashIcon from "../../assets/trashIcon.svg";
import tagIcon from "../../assets/tagIcon.svg";
import pointIcon from "../../assets/pointsIcon.svg";
import styles from "./OptionsBtn.module.css";
import { useState, useRef, useEffect } from "react";

function OptionsBtn({ projectKey }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      <button onClick={toggleVisibility} className={styles.btn}>
        <img src={pointIcon} alt="" />
      </button>

      <ul
        ref={componentRef}
        className={isVisible ? styles.options : "invisible"}
      >
        <li>
          <button className={styles.btn}>
            <img src={tagIcon} /> Tag
          </button>
        </li>
        <li>
          <button
            /* onClick={() => onRemoveProject(projectKey)}*/
            className={styles.btn}
          >
            <img src={trashIcon} /> Excluir
          </button>
        </li>
      </ul>
    </>
  );
}
export default OptionsBtn;

OptionsBtn.propTypes = {
  projectKey: PropTypes.string.isRequired,
  toggleVisibility: PropTypes.func,
  isVisible: PropTypes.func,
};
