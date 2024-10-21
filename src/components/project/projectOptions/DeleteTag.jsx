import styles from "./DeleteTag.module.css";
import xmarkIcon from "../../../assets/xmarkIcon.svg";
import PropTypes from "prop-types";

function DeleteTag({ projectkey, setProjectList, tag }) {
  const handleDeleteTag = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${projectkey}/tag`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag }), // Envia a tag a ser removida
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao remover tag: ${response.statusText}`);
      }

      const updatedProject = await response.json();
      setProjectList((prevList) =>
        prevList.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
    } catch (error) {
      console.error(error);
      alert("Não foi possível remover a tag.");
    }
  };

  return (
    <span className={styles.btn} onClick={handleDeleteTag}>
      <img src={xmarkIcon} alt="Delete tag" />
    </span>
  );
}

DeleteTag.propTypes = {
  projectkey: PropTypes.string.isRequired,
  setProjectList: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default DeleteTag;
