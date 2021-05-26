import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../lists.service'

@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {
  private listsService: ListsService
  @Input() listElements = []

  constructor(listsService: ListsService) {
    this.listsService = listsService
  }

  ngOnInit(): void {}

  createNewList() {
    this.listsService.createList('Testing').subscribe((res: any) => {
      console.log(res)
    })
  }

}
