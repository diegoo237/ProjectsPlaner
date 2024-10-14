import styles from "./TrashBtn.module.css";
import trashIcon from "../../assets/trashIcon.svg";
import PropTypes from "prop-types";

function TrashBtn({ projectkey }) {
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

      const result = await response.json();
      console.log(result.message); // Mensagem de sucesso
      // Aqui você pode atualizar o estado para remover o projeto da lista, se necessário
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Deletando projeto com ID:", projectkey); // Adicione este log
    deleteProject(projectkey);
  };

  return (
    <button onClick={handleSubmit} className={styles.btn}>
      <img src={trashIcon} /> Excluir
    </button>
  );
}

TrashBtn.propTypes = {
  projectkey: PropTypes.string.isRequired,
};

export default TrashBtn;
