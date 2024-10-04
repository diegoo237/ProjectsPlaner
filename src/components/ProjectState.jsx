import styles from "./ProjectState.module.css";
import PropTypes from "prop-types";
import Project from "../components/project/Project";
import AdProjectBtn from "./AdProjectBtn";
import AdProjectForm from "./project/AdProjectForm";
import { useState, useEffect, useRef } from "react";

function ProjectState({ station, projects, onRemoveProject, onAddProject }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(true);
  };

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

  return (
    <article className={styles.container}>
      <p className={styles.state}>{station}</p>
      <AdProjectBtn toggleVisibility={toggleVisibility} />
      <AdProjectForm
        isVisible={isVisible}
        componentRef={componentRef}
        onAddProject={(newProject) => onAddProject(newProject)}
      />
      {projects.length > 0 ? (
        <Project projectList={projects} onRemoveProject={onRemoveProject} />
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </article>
  );
}

ProjectState.propTypes = {
  station: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  onRemoveProject: PropTypes.func.isRequired,
  onAddProject: PropTypes.func.isRequired,
};

export default ProjectState;
