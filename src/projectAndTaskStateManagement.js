import isWithinInterval from 'date-fns/isWithinInterval';
import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import parseISO from 'date-fns/parseISO';
import isEqual from 'date-fns/isEqual';


const allProjects = [];
const taskListToRender = [];
let taskToUpdate;

let isProjectOnScreen;
let isAllOnScreen;
let isCompleteOnScreen;
let isThisWeekOnScreen;
let isTodayOnScreen;

let selectedproject;

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


export { addProjectToProjects, getProjects, getSelectedProject, setSelectedProject, getTaskListToRender, setTaskListToRender, editTask, allTasks, dueSevenDayTask, taskDueToday, completedTask, taskToUpdate };