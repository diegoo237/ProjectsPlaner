import styles from "./ProjectsPage.module.css";
import AppNav from "../components/AppNav";
import ProjectState from "../components/ProjectState";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectPage() {
  //buscando os stations no banco de dados
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://35.199.72.143:5000/stations");
        setStationList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os stations:", error);
      }
    };
    fetchStates();
  }, []);

  //busca os projetos no banoc de dados
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://35.199.72.143:5000/projects");
        setProjectList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
        // Aqui você pode adicionar lógica para informar o usuário
      }
    };
    fetchStates();
  }, []);

  return (
    <>
      <AppNav />
      <main className={styles.main}>
        {stationList.map((station) => (
          <ProjectState
            key={station._id}
            station={station.station}
            projects={projectList}
          />
        ))}
      </main>
    </>
  );
}

export default ProjectPage;
