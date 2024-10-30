import styles from "./ProjectsPage.module.css";
import ProjectStation from "../components/ProjectStation";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectPage() {
  const [stationList, setStationList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("http://35.199.72.143:5000/stations");
        setStationList(response.data);
      } catch (error) {
        console.error("Erro ao buscar as estações:", error);
      }
    };
    fetchStations();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        // Faz a requisição para buscar projetos, passando o token no cabeçalho
        const response = await axios.get("http://35.199.72.143:5000/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className={styles.main}>
      {stationList.map((station) => (
        <ProjectStation
          key={station._id}
          station={station.station}
          projects={projectList}
          setProjectList={setProjectList}
        />
      ))}
    </main>
  );
}

export default ProjectPage;
