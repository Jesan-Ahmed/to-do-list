import { eventListenerForProject, eventListenerForTask } from "./eventListener.js";
import { renderProjects, renderProjectTitle, renderTasks } from "./render.js";


function display(projectName){
    renderProjects();
    renderProjectTitle(projectName);
    renderTasks();
    eventListenerForProject();
    eventListenerForTask();
}



export {display};