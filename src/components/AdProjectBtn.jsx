import styles from "./AdProjectBtn.module.css";
import AdProjectForm from "./project/AdProjectForm";
import { useState } from "react";

function AdProjectBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <>
      <button onClick={toggleVisibility} className={styles.newProject}>
        + Adicionar Projeto
      </button>
      <AdProjectForm isVisible={isVisible} />
    </>
  );
}
export default AdProjectBtn;
