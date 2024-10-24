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
  const [description, setDescription] = useState("");
  const [prazo, setPrazo] = useState("");
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setUTCHours(date.getUTCHours() + new Date().getTimezoneOffset() / 60);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Carrega a descrição e o prazo atuais quando o componente é montado
  useEffect(() => {
    if (project) {
      setDescription(project.description || "");
      setPrazo(formatDate(project.prazo) || "");
      setStation(project.station || "");
    }
  }, [project]);

  const toggleVisibility = () => {
    setTrashIsVisible((prevIsVisible) => !prevIsVisible);
  };

  let tagsArray = [];
  if (project.tags) {
    tagsArray = Object.values(project.tags);
  }

  // Função para enviar as atualizações do projeto
  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (loading) {
      return; // Evita que a função seja executada novamente enquanto o loading está ativo
    }

    const url = `http://localhost:5000/projects/${project._id}`;

    // Cria um objeto com as informações que serão atualizadas
    const updatedData = {
      description,
      prazo,
      station,
    };

    try {
      setLoading(true); // Inicia o loading
      const response = await fetch(url, {
        method: "PUT", // Sempre utiliza PUT para atualizar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar projeto: ${response.statusText}`);
      }

      const updatedProject = await response.json();
      setProjectList((prevList) =>
        prevList.map((p) => (p._id === updatedProject._id ? updatedProject : p))
      );
      alert("Projeto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Não foi possível atualizar o projeto.");
    } finally {
      setLoading(false); // Finaliza o loading
    }
    loading ? "" : setIsVisible(false);
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
          <DropDown station={station} setStation={setStation} />
        </span>
        <p>Descrição do projeto</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Atualiza a descrição no estado
          rows="5"
          cols="50"
        />
        <p>Alterar Prazo</p>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)} // Atualiza o prazo no estado
        />
        <button onClick={handleUpdateProject} className={styles.btn}>
          {loading ? "Salvando..." : "Save"}
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
