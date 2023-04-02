import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  searchText = ''
  showForm = false;
  editForm = false;

  myTask: Task = {
    label: "",
    completed: false
  }
  tasks: Task[]=[];
  resultTasks: Task[]=[];

  constructor(private taskService:TaskService){}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => {
      this.resultTasks = this.tasks = tasks
    })
  }

  deleteTask(id:any){
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    })
  }

  persistTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask()
      this.showForm = false
    })
  }

  toggleCompleted(task:Task){
    this.taskService.completed(task.id, task.completed)
    .subscribe(() => {
      task.completed = !task.completed;
    })
  }

  resetTask(){
    this.myTask = {
      label: '',
      completed: false
    }
  }

  editTask(task:Task){
    this.myTask = task;
    this.editForm = true
  }

  editFormTask(task:Task){
    this.myTask = task;
    this.editForm =true;
  }

  updateTask(){
    this.taskService.update(this.myTask)
      .subscribe(task => {
        this.resetTask();
        this.editForm = false;
      })
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.includes(this.searchText))
  }
}
