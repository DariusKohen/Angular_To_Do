import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signindetails = this.formBuilder.group({
    email: '',
    password: ''
  })

  signin(){
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