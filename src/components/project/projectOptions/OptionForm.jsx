import PropTypes from "prop-types";
import TagBtn from "./TagBtn";
import TrashBtn from "./TrashBtn";
import DropDown from "./DropDown";
import Tag from "../Tag";
import DeleteTag from "./DeleteTag";
import xmarkIcon from "../../../assets/xmarkIcon.svg";
import TrashConfirm from "./TrashConfirm";
import styles from "./OptionForm.module.css";
import { useState, useEffect } from "react";

function OptionForm({
  isVisible,
  componentRef,
  project,
  setIsVisible,
  setProjectList,
}) {
  const [trashIsVisible, setTrashIsVisible] = useState(false);
  const [description, setDescription] = useState(""); // Estado para a descrição
  const [loading, setLoading] = useState(false); // Estado para loading

  // Carrega a descrição atual quando o componente é montado
  useEffect(() => {
    if (project && project.description) {
      setDescription(project.description); // Define a descrição atual
    }
  }, [project]);

  const toggleVisibility = () => {
    setTrashIsVisible((prevIsVisible) => !prevIsVisible);
  };

  let tagsArray = [];
  if (project.tags) {
    tagsArray = Object.values(project.tags);
  }

  // Função para enviar a nova descrição
  const handleUpdateDescription = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/projects/${project._id}/description`;

    try {
      setLoading(true); // Inicia o loading
      const response = await fetch(url, {
        method: "PUT", // Sempre utiliza PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar descrição: ${response.statusText}`);
      }

      const updatedProject = await response.json();
      setProjectList((prevList) =>
        prevList.map((p) => (p._id === updatedProject._id ? updatedProject : p))
      );
      alert("Descrição atualizada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Não foi possível atualizar a descrição.");
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <>
      <div
        ref={componentRef}
        className={isVisible ? styles.options : "invisible"}
      >
        <header>
          <div>
            <h1>{project.title}</h1>
            {tagsArray.map((tag, index) => (
              <Tag key={index} name={tag}>
                <DeleteTag
                  setProjectList={setProjectList}
                  projectkey={project._id}
                  tag={tag}
                />
              </Tag>
            ))}
          </div>
          <button
            className={styles.close_btn}
            onClick={() => setIsVisible(false)}
          >
            <img src={xmarkIcon} alt="Close" />
          </button>
        </header>

        <span>
          <TrashBtn toggleVisibility={toggleVisibility} />
          <TagBtn setProjectList={setProjectList} projectkey={project._id} />
          <DropDown />
        </span>
        <p>Descrição do projeto</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Atualiza a descrição no estado
          rows="5"
          cols="50"
        />
        <p>Alterar Data</p>
        <input type="date" />
        <button onClick={handleUpdateDescription} className={styles.btn}>
          {loading ? "Salvando..." : "Save"} {/* Exibe texto de loading */}
        </button>
        <TrashConfirm
          trashIsVisible={trashIsVisible}
          toggleVisibility={toggleVisibility}
          project={project}
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
