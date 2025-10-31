import { renderProjects } from "./render.js";
import { Project, Task } from "./projectAndTaskBuilder.js";
import {renderProjectTitle, renderTasks, renderTaskForm, closeTaskForm, renderEditTaskFrom, renderShowTask, closeShowTask, toggleCompleteThenRenderTask } from "./render.js";
import { addProjectToProjects, getProjects, getSelectedProject, setSelectedProject, setTaskListToRender, setOnScreen, setLocalStorage, taskToUpdate, allTasks, dueSevenDayTask, taskDueToday, completedTask, delTask } from "./projectAndTaskStateManagement.js";




function eventListenerForProject(){
    const ulForProjects = document.querySelector(".project");
    const ulForHome = document.querySelector(".home ul");
    
    ulForHome.addEventListener("click", (event)=>{

        const clickedElement = event.target;
        if(clickedElement.id === "all-task"){
            setOnScreen("all");
            renderProjectTitle("All Task");
            const listToRender = allTasks();
            setTaskListToRender(listToRender);
            renderTasks();
        }
        else if(clickedElement.id === "week"){
            setOnScreen("thisWeek");
            renderProjectTitle("Next 7 Days");
            const listToRender = dueSevenDayTask();
            setTaskListToRender(listToRender);
            renderTasks();
        }
        else if(clickedElement.id === "today"){
            setOnScreen("today");
            renderProjectTitle("Today");
            const listToRender = taskDueToday();
            setTaskListToRender(listToRender);
            renderTasks();
        }
        else  if(clickedElement.id === "complete"){
            setOnScreen("complete");
            renderProjectTitle("Completed");
            const listToRender = completedTask();
            setTaskListToRender(listToRender);
            renderTasks();
        }
        setLocalStorage();
    });

    ulForProjects.addEventListener("click", (event)=>{
        
        const addProject = document.querySelector(".project-form-li");
        const addProjectName = document.querySelector("#project-input");

        const clickedElement = event.target;

        if(clickedElement.id === "addProjectBtn"){
            addProject.style.display = "block";
        }
        else if(clickedElement.classList.contains("project-add-btn")){
            let projectName = addProjectName.value.trim();

            if(projectName){
                addProjectName.value = "";
                addProject.style.display = "none";
                addProjectToProjects(new Project(projectName));
                renderProjects();
            }
            
        }
        else if(clickedElement.classList.contains("project-cancel-btn")){
            addProjectName.value = "";
            addProject.style.display = "none";
        }
        else if( clickedElement.classList.contains("project-btn")){
            setOnScreen("project");
            const projectOfTheTasks = getProjects().find((project) =>{
                let id = project.getId();

                return id === clickedElement.id;
            } );
            
            setSelectedProject(projectOfTheTasks);
            const taskList = projectOfTheTasks.getTasks();
            setTaskListToRender(taskList);

            renderProjectTitle(projectOfTheTasks.name);
            renderTasks();

        }
        setLocalStorage();
    });

    
}


function eventListenerForTask(){
    const ulForTask = document.querySelector(".main ul");
    const parentOfTaskForm = document.querySelector(".form");
    const taskForm = document.querySelector(".form form");
    const parentOfEditTaskForm = document.querySelector(".edit-form");
    const editTaskForm = document.querySelector(".edit-form form");
    const addBtnForTaskForm = document.querySelector(".fieldset-btn1");
    const cancelBtnForTaskForm = document.querySelector(".fieldset-btn2");
    const editBtnForTaskForm = document.querySelector(".edit-fieldset-btn1");
    const cancelBtnForEditTaskForm = document.querySelector(".edit-fieldset-btn2");

    const titleInput = document.querySelector(".form #title");
    const descriptionInput = document.querySelector(".form #details");
    const dueDateInput = document.querySelector(".form #date");
    const priorityInput = document.querySelector(".form #priority");

    const editTitleInput = document.querySelector(".edit-form #edit-title");
    const editDescriptionInput = document.querySelector(".edit-form #edit-details");
    const editDueDateInput = document.querySelector(".edit-form #edit-date");
    const editPriorityInput = document.querySelector(".edit-form #edit-priority");

    const showTaskCloseBtn = document.querySelector(".cross");

    showTaskCloseBtn.addEventListener("click", ()=>{
        closeShowTask();
    });

    taskForm.addEventListener("submit", (event)=>{
        event.preventDefault();
    });

    editTaskForm.addEventListener("submit", (event)=>{
        event.preventDefault();
    })
    cancelBtnForTaskForm.addEventListener("click", ()=>{
        closeTaskForm(parentOfTaskForm, taskForm);
    });

    cancelBtnForEditTaskForm.addEventListener("click", ()=>{
        closeTaskForm(parentOfEditTaskForm, editTaskForm);
    });

    addBtnForTaskForm.addEventListener("click", ()=>{
        let selectedproject = getSelectedProject()
        if(selectedproject){
            

            let title = titleInput.value;
            let detail = descriptionInput.value;
            let dueDate = dueDateInput.value;
            let priority = priorityInput.value;

            if(title && detail && dueDate && priority){
                const newTaskToADD = new Task(title, detail, dueDate, priority);
                selectedproject.newTask(newTaskToADD);
                closeTaskForm(parentOfTaskForm, taskForm);
                setTaskListToRender(selectedproject.getTasks());
                renderTasks();
            }
        }
        setLocalStorage();
        
    });

    editBtnForTaskForm.addEventListener("click", ()=>{
        let title = editTitleInput.value;
        let detail = editDescriptionInput.value;
        let dueDate = editDueDateInput.value;
        let priority = editPriorityInput.value;

        closeTaskForm(parentOfEditTaskForm, editTaskForm);

        if(taskToUpdate){
            taskToUpdate.update(title, detail, dueDate, priority);
            renderTasks();
        }
        setLocalStorage();
    });

    ulForTask.addEventListener("click", (event)=>{
        const addTaskBtn = event.target.closest(".add-task-btn");
        const showTask = event.target.closest(".task-block-btn");
        const editTask = event.target.closest(".task-edit-btn");
        const delTaskBtn = event.target.closest(".task-delete-btn");
        const toggleCompleteBtn = event.target.closest(".task-complete-toggle-Btn");

        if(addTaskBtn){
            renderTaskForm(parentOfTaskForm);
        }
        else if(toggleCompleteBtn){
            const taskElement = toggleCompleteBtn.closest(".task-block-btn");
            toggleCompleteThenRenderTask(taskElement);
        }
        else if(editTask){
            const taskElement = editTask.closest(".task-block-btn");
            renderEditTaskFrom(taskElement);
        }
        else if(delTaskBtn){
            const taskElement = delTaskBtn.closest(".task-block-btn");
            delTask(taskElement.id);
            renderTasks();
        }
        else if(showTask){
            renderShowTask(showTask)
        }
        setLocalStorage();
    });

}

export { eventListenerForProject, eventListenerForTask };