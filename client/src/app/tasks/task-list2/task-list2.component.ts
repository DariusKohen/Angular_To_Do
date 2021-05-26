import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../../lists/lists.service'

@Component({
  selector: 'app-task-list2',
  templateUrl: './task-list2.component.html',
  styleUrls: ['./task-list2.component.css']
})
export class TaskList2Component implements OnInit {
  private listsService: ListsService
  @Input() taskElements

  constructor(listsService: ListsService) {
    this.listsService = listsService
  }

  ngOnInit(): void {}

  onTaskClick(task: any) {
    this.listsService.done(task).subscribe(() => {
      task.done = !task.done
    })
  }

}
