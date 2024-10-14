import styles from "./TagBtn.module.css";
import tagIcon from "../../assets/tagIcon.svg";
import PropTypes from "prop-types";
import { useState } from "react";

function TagBtn({ projectkey }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const toggleVisibility = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  // Chama a api para adicionar uma tag ao projeto
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

      const data = await response.json();
      console.log("Projeto atualizado:", data);
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
  };

  return (
    <div className={styles.tag}>
      <div onClick={toggleVisibility} className={styles.btn}>
        <img src={tagIcon} alt="Tag icon" /> Tag
      </div>
      <form
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
      {message && <p className={styles.message}>{message}</p>}{" "}
      {/* Mensagem de feedback */}
    </div>
  );
}

TagBtn.propTypes = {
  projectkey: PropTypes.string.isRequired,
};

export default TagBtn;
