import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  tasksService: TasksService

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService
  }

  onAddTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.tasksService.addTask({
      title: form.value.title,
      content: form.value.content
    })
    form.resetForm()
  }
}
