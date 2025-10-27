import addFolderImage from "./resources/add-folder-svgrepo-com.svg";
import plusCircle from "./resources/plus-circle-svgrepo-com.svg";
import deleteImage from "./resources/delete-2-svgrepo-com.svg";
import editImage from "./resources/edit-3-svgrepo-com.svg"

import { getProjects, getTaskListToRender, getSelectedProject, editTask, taskToUpdate, } from "./projectAndTaskStateManagement";


function renderProjects(){
    const displayProjects = document.querySelector(".project ul");
    
    displayProjects.innerHTML = "";
    displayProjects.innerHTML = `<li><button id="addProjectBtn" class="project-btn">Add Project</button></li>
                                 <li class="project-form-li">
                                    <form action="#">
                                        <div class="project-input-field">
                                            <label for="project-input"><img src="resources/add-folder-svgrepo-com.svg" alt="add folder"></label>
                                            <input id="project-input" type="text" maxlength="22">
                                        </div>
                                        <div class="project-input-btn">
                                            <button type="button" class="project-add-btn">Add</button>
                                            <button type="button" class="project-cancel-btn">Cancel</button>
                                        </div>
                                    </form>
                                 </li> `;

    const formImg = document.querySelector(".project-input-field img");
    formImg.src = addFolderImage;
    
    for(const project of getProjects()){
        const newLi = document.createElement("li");
        const newBtn = document.createElement("button");

        newBtn.textContent = project.name;
        newBtn.classList.add("project-btn");
        newBtn.id = project.getId();
        newLi.appendChild(newBtn);
        displayProjects.appendChild(newLi);
    }

    
}

function renderProjectTitle(title){
    const titleElement = document.querySelector(".main-header");
    titleElement.textContent = title;
}


function renderTasks(){
    const taskUl = document.querySelector(".main ul");
    taskUl.innerHTML = "";

    const listOfTasks = getTaskListToRender();
    const addTaskOption = addTaskbtn();
    addTaskOption.style.display = "block";
    taskUl.appendChild(addTaskOption);
    
    for(const task of listOfTasks){
        let newTask = createTaskBlockToRender(task);
        taskUl.appendChild(newTask);
    }
    
}

function addTaskbtn(){
    const addTaskLi = document.createElement("li");
    const addTaskBtn = document.createElement("button");
    const addTaskBtnDiv = document.createElement("div");
    const addTaskBtnDivImg = document.createElement("img");
    const addTaskBtnDivh2 = document.createElement("h2");

    addTaskBtnDivh2.textContent = "Add Task";
    addTaskBtnDivImg.src = plusCircle;
    addTaskBtnDivImg.alt = "add task";
    addTaskBtn.type = "button";

    addTaskBtn.classList.add("add-task-btn");

    addTaskBtnDiv.appendChild(addTaskBtnDivImg);
    addTaskBtnDiv.appendChild(addTaskBtnDivh2);

    addTaskBtn.appendChild(addTaskBtnDiv);
    addTaskLi.appendChild(addTaskBtn);

    return addTaskLi;
}

function renderTaskForm(addTaskForm){
    const legend = document.querySelector(".form legend");
    legend.textContent = `Add todo for ${getSelectedProject().getName()}`;
    addTaskForm.style.display = "block";
}

function cleanTaskForm(taskFormElement){
    taskFormElement.reset();
}

function closeTaskForm(taskFromParent, taskFormElement){
    taskFromParent.style.display = "none";
    cleanTaskForm(taskFormElement);
}

function createTaskBlockToRender(task){
    const liElement = document.createElement("li");
    const taskBtnElement = document.createElement("button");
    const taskCompleteToggleBtn = document.createElement("button");
    const taskTitleElement = document.createElement("h1");
    const taskDueDAteElement = document.createElement("h2");
    const taskPriorityElement = document.createElement("h2");
    const taskEditBtnElement = document.createElement("button");
    const taskEditBtnImgElement = document.createElement("img");
    const taskDeleteBtnElement = document.createElement("button");
    const taskDeleteBtnImgElement = document.createElement("img");

    taskTitleElement.textContent = task.title;
    taskDueDAteElement.textContent = task.dueDate;
    taskPriorityElement.textContent = task.priority.toUpperCase();

    if(task.isComplete()){
        taskCompleteToggleBtn.style.backgroundColor = "#06402B";
        taskTitleElement.style.textDecoration = "line-through";
    }

    taskEditBtnImgElement.src = editImage;
    taskEditBtnImgElement.alt = "edit";
    taskDeleteBtnImgElement.src = deleteImage;
    taskDeleteBtnImgElement.alt = "delete";

    taskBtnElement.classList.add("task-block-btn");
    taskCompleteToggleBtn.classList.add("task-complete-toggle-Btn");
    taskPriorityElement.classList.add("priority");
    taskPriorityElement.classList.add(task.priority);
    taskDueDAteElement.classList.add("due-date");

    taskDeleteBtnElement.classList.add("task-delete-btn");
    taskEditBtnElement.classList.add("task-edit-btn");

    taskEditBtnElement.appendChild(taskEditBtnImgElement);
    taskDeleteBtnElement.appendChild(taskDeleteBtnImgElement);

    taskBtnElement.appendChild(taskCompleteToggleBtn);
    taskBtnElement.appendChild(taskTitleElement);
    taskBtnElement.appendChild(taskPriorityElement);
    taskBtnElement.appendChild(taskDueDAteElement);
    taskBtnElement.appendChild(taskEditBtnElement);
    taskBtnElement.appendChild(taskDeleteBtnElement);

    taskBtnElement.id = task.getId();

    liElement.appendChild(taskBtnElement);
    liElement.classList.add("task-block");

    return liElement;
}

function renderEditTaskFrom(taskElement){
    const formContainer = document.querySelector(".edit-form");
    const legend = document.querySelector(".edit-form legend");
    const titleElement = document.querySelector("#edit-title");
    const priorityElement = document.querySelector("#edit-priority");
    const detailsElement = document.querySelector("#edit-details");
    const dateElement = document.querySelector("#edit-date");

    editTask(taskElement);

    const todoObj = taskToUpdate.getInfo();

    legend.textContent = todoObj.title;
    titleElement.value = todoObj.title;
    priorityElement.value = todoObj.priority;
    detailsElement.value = todoObj.details;
    dateElement.value = todoObj.dueDate;

    
    formContainer.style.display = "block";
}

function renderShowTask(task){
    const showTaskContainer = document.querySelector(".task");
    const title = document.querySelector(".clicked-task h1");
    const details = document.querySelector(".clicked-task p");

    editTask(task);
    const todoObj = taskToUpdate.getInfo();

    title.textContent = todoObj.title;
    details.textContent = todoObj.details;

    showTaskContainer.style.display = "block";
}

function closeShowTask(){
    const showTaskContainer = document.querySelector(".task");
    const title = document.querySelector(".clicked-task h1");
    const details = document.querySelector(".clicked-task p");

    title.textContent = "";
    details.textContent = "";

    showTaskContainer.style.display = "none";
}

function toggleCompleteThenRenderTask(taskElement){

    editTask(taskElement);
    const taskObj = taskToUpdate;
    taskObj.toggleComplete();
    renderTasks();
}

export { renderProjects, renderProjectTitle, renderTasks, renderTaskForm, cleanTaskForm, closeTaskForm, renderEditTaskFrom, renderShowTask, closeShowTask, toggleCompleteThenRenderTask };