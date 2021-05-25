import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  private tasksService: TasksService
  private tasksSub: Subscription
  tasks: Task[] = []

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService
  }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks()
    this.tasksSub = this.tasksService.getTaskUpdateListener().subscribe((tasks: Task[]) => {
      this.tasks = tasks
    })
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe()
  }
}
