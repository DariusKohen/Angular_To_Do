import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ListsService } from '../../lists/lists.service';

@Component({
  selector: 'app-task-create2',
  templateUrl: './task-create2.component.html',
  styleUrls: ['./task-create2.component.css']
})
export class TaskCreate2Component implements OnInit {
  private listsService: ListsService
  private route: ActivatedRoute
  private router: Router
  listId: String

  constructor(listsService: ListsService, route: ActivatedRoute, router: Router) {
    this.listsService = listsService
    this.route = route
    this.router = router
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params['listId']
    })
  }

  createTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listsService.createTask(form.value.title, this.listId).subscribe((newTask: any) => {
      this.router.navigate(['../'], { relativeTo: this.route })
    })
    form.resetForm()
  }
}
