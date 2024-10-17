import styles from "./TagBtn.module.css";
import tagIcon from "../../../assets/tagIcon.svg";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

function TagBtn({ projectkey, setProjectList }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const componentRef = useRef(null);
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      toggleVisibility();
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

  // Limpa a mensagem após 2 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000); // 2000ms = 2 segundos

      // Limpa o temporizador se a mensagem mudar ou o componente for desmontado
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Chama a API para adicionar uma tag ao projeto
  const addTagToProject = async (projectId, tag) => {
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${projectId}/tag`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro na solicitação");
      }

      const updatedProject = await response.json();
      console.log("Projeto atualizado:", updatedProject);

      // Atualiza o estado da lista de projetos
      setProjectList((prevList) =>
        prevList.map((project) =>
          project._id === projectId ? updatedProject : project
        )
      );

      setMessage("Tag adicionada com sucesso!"); // Atualiza a mensagem de sucesso
    } catch (error) {
      console.error("Erro:", error);
      setMessage("Erro ao adicionar a tag."); // Atualiza a mensagem de erro
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tag) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    addTagToProject(projectkey, tag);
    setTag("");
  };

  return (
    <div className={styles.tag}>
      <div onClick={toggleVisibility} className={styles.btn}>
        <img src={tagIcon} alt="Tag icon" /> Tag
      </div>
      <form
        ref={componentRef}
        onSubmit={handleSubmit}
        className={isVisible ? styles.options : "invisible"}
      >
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

TagBtn.propTypes = {
  projectkey: PropTypes.string.isRequired,
  setProjectList: PropTypes.func,
};

export default TagBtn;
