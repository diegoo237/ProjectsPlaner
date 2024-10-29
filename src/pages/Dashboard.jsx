import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        setProjectList(response.data);
      } catch (error) {
        console.error("Erro ao buscar os projetos:", error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <section className={styles.dashContent}>
      <div>
        <p>Numero de projetos</p>
        <h1>{projectList.length}</h1>
      </div>
      <div>
        <p>Numero de projetos a fazer</p>
        <h1>
          {
            projectList.filter((project) => project.station === "a_fazer")
              .length
          }
        </h1>
      </div>
      <div>
        <p>Numero de projetos fazendo </p>
        <h1>
          {
            projectList.filter((project) => project.station === "fazendo")
              .length
          }
        </h1>
      </div>
      <div>
        <p>Numero de projetos feitos</p>
        <h1>
          {projectList.filter((project) => project.station === "feito").length}
        </h1>
      </div>
    </section>
  );
}
export default Dashboard;
