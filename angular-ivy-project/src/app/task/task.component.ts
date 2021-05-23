import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskdetails = this.formBuilder.group({
    username: '',
    firstname: '',
    lastname: '',
    taskdate: ''
  });

  task() {
    window.alert('You have signed in');
  }
  constructor(
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    console.warn('All details have been submited');
  }

  ngOnInit() {}
}
