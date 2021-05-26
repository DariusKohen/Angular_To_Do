import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private listsService: ListsService
  private route: ActivatedRoute
  lists: any[]
  tasks: any[]

  constructor(listsService: ListsService, route: ActivatedRoute) {
    this.listsService = listsService
    this.route = route
    this.lists = []
    this.tasks = []
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.listsService.getTasks(params.listId).subscribe((tasks: any[]) => {
        this.tasks = tasks
      })
    })

    this.listsService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    })
  }

}
