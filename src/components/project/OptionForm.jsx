import PropTypes from "prop-types";
import TagBtn from "./TagBtn";
import TrashBtn from "./TrashBtn";
import xmarkIcon from "../../assets/xmarkIcon.svg";
import TrashConfirm from "./TrashConfirm";
import styles from "./OptionForm.module.css";
import { useState } from "react";

function OptionForm({
  isVisible,
  componentRef,
  project,
  setIsVisible,
  setProjectList,
}) {
  const [trashIsVisible, setTrashIsVisible] = useState(false);

  const toggleVisibility = () => {
    setTrashIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <>
      <div
        ref={componentRef}
        className={isVisible ? styles.options : "invisible"}
      >
        <header>
          <h1>{project.title}</h1>
          <button
            className={styles.close_btn}
            onClick={() => setIsVisible(false)}
          >
            <img src={xmarkIcon} />
          </button>
        </header>

        <span>
          <TrashBtn toggleVisibility={toggleVisibility} />
          <TagBtn setProjectList={setProjectList} projectkey={project._id} />
          <p>Station</p>
        </span>
        <p>Descriçao do projeto</p>
        <textarea></textarea>
        <p>Alterar Data</p>
        <input type="date"></input>
        <button className={styles.btn}>Save</button>
        <TrashConfirm
          trashIsVisible={trashIsVisible}
          toggleVisibility={toggleVisibility}
          projectkey={project._id}
          setIsVisible={setIsVisible}
          setProjectList={setProjectList}
        />
      </div>
    </>
  );
}

export default OptionForm;

OptionForm.propTypes = {
  project: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  componentRef: PropTypes.object,
  setIsVisible: PropTypes.func,
  setProjectList: PropTypes.func,
};
