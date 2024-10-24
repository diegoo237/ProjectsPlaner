import styles from "./ProjectStation.module.css";
import PropTypes from "prop-types";
import AdProjectBtn from "./AdProjectBtn";
import AdProjectForm from "./project/AdProjectForm";
import Project from "./project/Project";
import { useState, useEffect, useRef } from "react";

function ProjectStation({ station, projects, setProjectList }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  //filtra os prjetos em cada estado
  function filterProjects() {
    return projects.filter((project) => project.station === station);
  }

  //seta a visibilidade de um componente
  const toggleVisibility = () => {
    setIsVisible(true);
  };
  //retira a visibilidade de um componente caso clique fora dele
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  //arrumando sintaxe do titulo
  function correctTitle() {
    const title = station.includes("_") ? station.replace("_", "") : station;
    return title.toUpperCase();
  }

  const filteredProjects = filterProjects();

  return (
    <article className={styles.container}>
      <p className={styles.state_title}>{correctTitle()}</p>
      <AdProjectBtn toggleVisibility={toggleVisibility} />
      <AdProjectForm
        setProjectList={setProjectList}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        componentRef={componentRef}
        station={station}
      />
      {filteredProjects.map((project) => (
        <Project
          setProjectList={setProjectList}
          key={project._id}
          project={project}
        />
      ))}
    </article>
  );
}

ProjectStation.propTypes = {
  station: PropTypes.string,
  projects: PropTypes.array,
  setProjectList: PropTypes.func,
};

export default ProjectStation;
