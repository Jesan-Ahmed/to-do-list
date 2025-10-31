import isWithinInterval from 'date-fns/isWithinInterval';
import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import parseISO from 'date-fns/parseISO';
import isEqual from 'date-fns/isEqual';


const allProjects = [];
const taskListToRender = [];
let taskToUpdate;

const onScreen = {
    project: true,
    all: false,
    complete: false,
    thisWeek: false,
    today: false,
};

let selectedproject;

const setOnScreen = (isOnScreen)=>{
    for(let key in onScreen){
        if(key === isOnScreen){
            onScreen[key] = true;
        }
        else{
            onScreen[key] = false;
        }
    }
}

const getOnScreen = ()=>{
    for(let key in onScreen){
        if(!onScreen[key]){
            continue;
        }
        return key;
    }
}

const getSelectedProject = ()=>{
    return selectedproject;
}

const setSelectedProject = (project)=>{
    selectedproject = project;
}

const addProjectToProjects = (newProject)=>{
    allProjects.push(newProject);
}

const getProjects = ()=>{
    return [...allProjects];
}


function getTaskListToRender(){
    return [...taskListToRender];
}

function setTaskListToRender(newList){
    taskListToRender.length = 0;
    taskListToRender.push(...newList);
}

function editTask(taskToFind){
    let todo;
    for(const project of allProjects){
        todo = project.getTasks().find( task => task.getId() === taskToFind.id);
        if(todo){
            break;
        }
    }
    taskToUpdate = todo;
}

function delTask(id){
    const theProject = allProjects.find( project => project.getTasks().find( task => task.getId() === id));

    if(theProject){
        theProject.deleteTask(id);
    }
    function changeTaskList(taskList){
        taskListToRender.length = 0;
        taskListToRender.push(...taskList);
    }
    const onDisplay = getOnScreen();
    if(onDisplay === "project"){
        changeTaskList(selectedproject.getTasks());
    }
    else if(onDisplay === "all"){
        changeTaskList(allTasks());
    }
    else if(onDisplay === "complete"){
        changeTaskList(completedTask());
    }
    else if(onDisplay === "thisWeek"){
        changeTaskList(dueSevenDayTask());
    }
    else if(onDisplay === "today"){
        changeTaskList(taskDueToday());
    }
}

function allTasks(){
    const allTask = [];
    for(const project of allProjects){
        allTask.push(...project.getTasks());
    }

    return allTask;

}


function dueSevenDayTask(){

    const taskDueThisWeek = [];

    const today = startOfDay(new Date());
    const sixDayFromNow = addDays(today, 7);
    const interval ={
        start: today,
        end: sixDayFromNow,
    };

    for(const project of allProjects){
        for(const task of project.getTasks()){

            const taskDateStr = task.getInfo().dueDate;
            const taskDateObj = parseISO(taskDateStr);
            const taskDate = startOfDay(taskDateObj);
            const isDueThisWeek = isWithinInterval(taskDate, interval);

            if(isDueThisWeek){
                taskDueThisWeek.push(task);
            }
        }
    }

    return taskDueThisWeek;
}


function taskDueToday(){
    const taskDueToday = [];
    const today = startOfDay(new Date());

    for(const project of allProjects){
        for(const task of project.getTasks()){

            const taskDateStr = task.getInfo().dueDate;
            const taskDateObj = parseISO(taskDateStr);
            const taskDate = startOfDay(taskDateObj);
            const isDueToday = isEqual(taskDate, today);

            if(isDueToday){
                taskDueToday.push(task);
            }
        }
    }

    return taskDueToday;

}


function completedTask(){
    const listOfCompletedTask = [];
    
    for(const project of allProjects){
        for(const task of project.getTasks()){
            if(task.isComplete()){
                listOfCompletedTask.push(task);
            }
        }
    }

    return listOfCompletedTask;
}


export { addProjectToProjects, getProjects, getSelectedProject, setSelectedProject, getTaskListToRender, setTaskListToRender, editTask, allTasks, dueSevenDayTask, taskDueToday, completedTask, setOnScreen, delTask, taskToUpdate };