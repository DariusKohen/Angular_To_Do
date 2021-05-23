import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],//RouterModule.forRoot([
  //{path: 'log-in', component: LogInComponent }
  declarations: [ AppComponent, HelloComponent, TaskComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
