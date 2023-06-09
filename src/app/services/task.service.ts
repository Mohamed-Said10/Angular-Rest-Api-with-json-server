import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000/tasks";

  findAll(){
    return this.http.get<Task[]>(this.apiUrl)
  }

  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(task:Task){
    return this.http.post<Task>(this.apiUrl, task)
  }

  completed(id:any, completed:boolean){
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !completed})
  }

  update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`, {task})
  }
}
