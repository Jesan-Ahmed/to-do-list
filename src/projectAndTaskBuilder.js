
class Project{
    constructor(name){
        this.name = name;
        this.tasks = [];
    }
    newTask(task){
        this.tasks.push(task);
    }
    getTasks(){
        return [...this.tasks];
    }
    deleteTask(id){
        const newList = this.tasks.filter( task => task.getId() !== id);
        this.tasks.length = 0;
        this.tasks.push(...newList);
    }
    getId(){
        return this.name
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/gi, "")
                .toLowerCase();
    }
    getName(){
        return this.name;
    }
}

class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; 
        this.priority = priority;
        this.complete = false;
    }
    getInfo(){
        return{
            title: this.title,
            details: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
        }
    }

    update(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    isComplete(){
        return this.complete;
    }
    toggleComplete(){
        this.complete = !this.complete;
    }
    getId(){
        return this.title
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/gi, "")
                .toLowerCase();
    }
}

export {Project, Task};