import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import styles from "./TrashConfirm.module.css";

function TrashConfirm({
  trashIsVisible,
  toggleVisibility,
  projectkey,
  setIsVisible,
  setProjectList,
}) {
  const componentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      toggleVisibility();
    }
  };
  useEffect(() => {
    if (trashIsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trashIsVisible]);

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error("Erro ao deletar o projeto");
      }

      // Atualiza a lista de projetos removendo o projeto deletado
      setProjectList((prevList) =>
        prevList.filter((project) => project._id !== projectId)
      );

      const result = await response.json();
      console.log(result.message); // Mensagem de sucesso
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Deletando projeto com ID:", projectkey); // Adicione este log
    deleteProject(projectkey);
    setIsVisible(false);
    toggleVisibility();
  };

  return (
    <div
      ref={componentRef}
      className={trashIsVisible ? styles.conteiner : "invisible"}
    >
      <p>Tem certexa que quer excluir o projeto X ?</p>
      <div className={styles.btn_box}>
        <button onClick={handleSubmit}>Confirmar</button>
        <button onClick={toggleVisibility}>Cancelar</button>
      </div>
    </div>
  );
}
export default TrashConfirm;

TrashConfirm.propTypes = {
  trashIsVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func,
  setIsVisible: PropTypes.func,
  projectkey: PropTypes.string.isRequired,
  setProjectList: PropTypes.func,
};
