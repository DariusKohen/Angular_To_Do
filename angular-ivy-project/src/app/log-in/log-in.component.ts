import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  logindetails = this.formBuilder.group({
    username: '',
    firstname: '',
    lastname: '',
    dateofbirth: '',
    email: '',
    password: ''
  })

  login(){
    window.alert('You have signed in');
  }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  onSubmit():void{
   console.warn('All details have been submited');
  }



  ngOnInit() {
  }

}