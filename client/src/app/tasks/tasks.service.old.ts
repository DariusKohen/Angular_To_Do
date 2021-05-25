import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from './task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = []
  private tasksUpdated = new Subject<Task[]>()

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
