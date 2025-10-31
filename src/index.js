import "./styles.css";
import { display } from "./display";
import { addProjectToProjects, setSelectedProject, getSelectedProject, setTaskListToRender, getLocalStorage, getProjects } from "./projectAndTaskStateManagement";
import { Project } from "./projectAndTaskBuilder";

getLocalStorage();

if(!getProjects().length){
    const defaultProject = new Project("Main")
    addProjectToProjects(defaultProject);
    setSelectedProject(defaultProject);
    setTaskListToRender(defaultProject.getTasks());
}

display(getSelectedProject().name);