import PropTypes from "prop-types";
import styles from "./AdProjectForm.module.css";
import { useState } from "react";
import axios from "axios";

function AdProjectForm({
  isVisible,
  componentRef,
  setIsVisible,
  station,
  setProjectList,
}) {
  const [title, setTitle] = useState("");
  const [prazo, setPrazo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !prazo) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const newTask = { title, station, prazo };

    try {
      await axios.post("http://35.199.72.143:5000/projects", newTask);
      // Faça uma nova requisição para buscar a lista atualizada de projetos
      const response = await axios.get("http://35.199.72.143:5000/projects");
      setProjectList(response.data);
      setTitle("");
      setPrazo("");
      setIsVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      alert("Houve um erro ao adicionar o projeto. Tente novamente.");
    }
  };

  return (
    <form
      ref={componentRef}
      className={isVisible ? styles.addProjectForm : "invisible"}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <input
          className={styles.textImput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do Projeto"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Definir data de conclusão</label>
        <input
          className={styles.dateImput}
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit">Adicionar Projeto</button>
      </div>
    </form>
  );
}

export default AdProjectForm;

AdProjectForm.propTypes = {
  station: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  componentRef: PropTypes.object,
  setProjectList: PropTypes.func.isRequired,
};
