import PropTypes from "prop-types";
import pointIcon from "../../assets/pointsIcon.svg";
import styles from "./OptionsBtn.module.css";
import { useState, useRef, useEffect } from "react";
import OptionForm from "./OptionForm";

function OptionsBtn({ projectKey }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  //seta a visibilidade de um componente
  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  //retira a visibilidade de um componente caso clique fora dele
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

      <OptionForm
        isVisible={isVisible}
        componentRef={componentRef}
        projectKey={projectKey}
      />
    </>
  );
}
export default OptionsBtn;

OptionsBtn.propTypes = {
  projectKey: PropTypes.string.isRequired,
  toggleVisibility: PropTypes.func,
  isVisible: PropTypes.func,
};
