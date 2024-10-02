import styles from "./ProjectsPage.module.css";
import AppNav from "../components/AppNav";
import ProjectState from "../components/ProjectState";
import { useReducer } from "react";

// lista de status de projeto Ex (Fazendo)
const projectStates = [
  { id: "a_fazer", station: "A fazer", key: "1" },
  { id: "fazendo", station: "Fazendo", key: "2" },
  { id: "aguardando", station: "Aguardando", key: "3" },
  { id: "concluido", station: "Concluido", key: "4" },
];

const initialProjects = [
  {
    id: "fazendo",
    key: 1,
    tag: "Projeto Pessoal",
    title: "Projeto Codigo certo",
    prazo: 10,
  },
  {
    id: "a_fazer",
    key: 2,
    tag: "Projeto de Trabalho",
    title: "Desenvolvimento de Site Institucional",
    prazo: 30,
  },
  {
    id: "concluido",
    key: 3,
    tag: "Projeto Acadêmico",
    title: "Pesquisa em Ciência da Computação",
    prazo: 15,
  },
];

const ADD_PROJECT = "addProject";
const REMOVE_PROJECT = "removeProject";

function filterProjectsByState(projects, stateId) {
  return projects.filter((project) => project.id === stateId);
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.key !== action.payload
        ),
      };
    default:
      throw new Error("Action unknown");
  }
}

function ProjectPage() {
  const [state, dispatch] = useReducer(reducer, { projects: initialProjects });

  return (
    <>
      <AppNav />

      <main className={styles.main}>
        {projectStates.map((station) => {
          // Filtrando os projetos de acordo com o ID do estado (station.id)
          const filteredProjects = filterProjectsByState(
            state.projects,
            station.id
          );

          return (
            <ProjectState
              station={station.station}
              key={station.key}
              id={station.id}
              projects={filteredProjects}
              onRemoveProject={(key) =>
                dispatch({ type: REMOVE_PROJECT, payload: key })
              }
            />
          );
        })}
      </main>
    </>
  );
}

export default ProjectPage;
