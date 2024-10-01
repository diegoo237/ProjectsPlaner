import styles from "./ProjectState.module.css";
import PropTypes from "prop-types";
import Project from "../components/Project";
import AdProjectBtn from "./AdProjectBtn";

//Lita de Projetos
const projectList = [
  {
    id: "fazendo-1",
    key: 1,
    tag: "Projeto Pessoal",
    title: "Projeto Codigo certo",
    prazo: 10,
  },
  {
    id: "a_fazer-2",
    key: 2,
    tag: "Projeto de Trabalho",
    title: "Desenvolvimento de Site Institucional",
    prazo: 30,
  },
  {
    id: "concluido-3",
    key: 3,
    tag: "Projeto Acadêmico",
    title: "Pesquisa em Ciência da Computação",
    prazo: 15,
  },
  {
    id: "aguardando-4",
    key: 4,
    tag: "Projeto Pessoal",
    title: "Aplicativo de Receitas",
    prazo: 20,
  },
  {
    id: "fazendo-5",
    key: 5,
    tag: "Projeto de Trabalho",
    title: "Sistema de Gerenciamento de Tarefas",
    prazo: 25,
  },
  {
    id: "concluido-6",
    key: 6,
    tag: "Projeto Acadêmico",
    title: "Desenvolvimento de um Jogo",
    prazo: 12,
  },
  {
    id: "a_fazer-7",
    key: 7,
    tag: "Projeto Pessoal",
    title: "Blog de Viagens",
    prazo: 18,
  },
  {
    id: "aguardando-8",
    key: 8,
    tag: "Projeto de Trabalho",
    title: "Plataforma de E-commerce",
    prazo: 40,
  },
  {
    id: "fazendo-9",
    key: 9,
    tag: "Projeto Acadêmico",
    title: "Simulação de Redes Neurais",
    prazo: 35,
  },
  {
    id: "concluido-10",
    key: 10,
    tag: "Projeto Pessoal",
    title: "Gerador de Senhas",
    prazo: 5,
  },
  {
    id: "a_fazer-11",
    key: 11,
    tag: "Projeto de Trabalho",
    title: "Aplicativo de Notas",
    prazo: 22,
  },
];

function ProjectState({ station, id }) {
  // Filtrando os projetos com base no id do ProjectState
  const filteredProjects = projectList.filter((project) => project.id === id);

  return (
    <article className={styles.container}>
      <p className={styles.state}>{station}</p>
      <AdProjectBtn />
      {filteredProjects.length > 0 ? (
        <Project projectList={filteredProjects} />
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </article>
  );
}

ProjectState.propTypes = {
  station: PropTypes.string,
  id: PropTypes.string,
};
export default ProjectState;
