import { eventListenerForProject, eventListenerForTask } from "./eventListener.js";
import { renderProjects, renderProjectTitle, renderTasks } from "./render.js";


function display(){
    renderProjects();
    renderProjectTitle("Main");
    renderTasks();
    eventListenerForProject();
    eventListenerForTask();
}



export {display};