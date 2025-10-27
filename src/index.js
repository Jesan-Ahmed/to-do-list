import "./styles.css";
import { display } from "./display";
import { addProjectToProjects, setSelectedProject, setTaskListToRender } from "./projectAndTaskStateManagement";
import { Project } from "./projectAndTaskBuilder";

const defaultProject = new Project("Main")
addProjectToProjects(defaultProject);
setSelectedProject(defaultProject);
setTaskListToRender(defaultProject.getTasks());

display();