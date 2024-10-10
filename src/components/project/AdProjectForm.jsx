import PropTypes from "prop-types";
import styles from "./AdProjectForm.module.css";
import { useState } from "react";
import axios from "axios";

function AdProjectForm({ isVisible, componentRef, setIsVisible, station }) {
  const [title, setTitle] = useState("");
  const [prazo, setPrazo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !prazo) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    const newTask = { title, station, prazo };
    await axios.post("http://35.199.72.143:5000/projects", newTask);
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
          placeholder="Titulo do Projeto"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Definir data de conclusao</label>
        <input
          className={styles.dateImput}
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setIsVisible(false)} type="submit">
          Adicionar Projeto
        </button>
      </div>
    </form>
  );
}
export default AdProjectForm;

AdProjectForm.propTypes = {
  station: PropTypes.string,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  componentRef: PropTypes.object,
};
