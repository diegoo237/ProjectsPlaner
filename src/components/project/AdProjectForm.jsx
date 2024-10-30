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
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    try {
      await axios.post("http://localhost:5000/projects", newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Requisição para obter a lista atualizada de projetos do usuário
      const response = await axios.get("http://localhost:5000/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectList(response.data);

      // Limpa os campos e fecha o formulário
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
