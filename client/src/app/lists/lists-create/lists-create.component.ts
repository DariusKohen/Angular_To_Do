import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ListsService } from '../lists.service';

@Component({
  selector: 'app-lists-create',
  templateUrl: './lists-create.component.html',
  styleUrls: ['./lists-create.component.css']
})
export class ListsCreateComponent implements OnInit {
  private listsService: ListsService
  private router: Router

  constructor(listsService: ListsService, router: Router) {
    this.listsService = listsService
    this.router = router
  }

  ngOnInit(): void {}

  createList(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listsService.createList(form.value.title).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['/lists', res._id])
    })
    form.resetForm()
  }
}
