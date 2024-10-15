import styles from "./ProjectsPage.module.css";
import AppNav from "../components/AppNav";
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
      try {
        const response = await axios.get("http://35.199.72.143:5000/projects");
        setProjectList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <AppNav />
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
    </>
  );
}

export default ProjectPage;
