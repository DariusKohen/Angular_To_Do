import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';
import { WebRequestsService } from '../web-requests/web-requests.service';

@Injectable({providedIn: 'root'})
export class TasksService {
  private webReqService: WebRequestsService;
  private tasks: Task[] = []
  private tasksUpdated = new Subject<Task[]>()

  contructor(webReqService : WebRequestsService) {
    this.webReqService = webReqService;
  }

  getTasks() {
    return [...this.tasks];
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task)
    this.tasksUpdated.next([...this.tasks])
  }
}
