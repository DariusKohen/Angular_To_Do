import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

import { TestUiComponent } from './test/test-ui.component';
import { ListsListComponent } from './lists/lists-list/lists-list.component';
import { ListsCreateComponent } from './lists/lists-create/lists-create.component';
import { TaskList2Component } from './tasks/task-list2/task-list2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskCreate2Component } from './tasks/task-create2/task-create2.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskCreateComponent,
    TaskListComponent,
    TestUiComponent,
    ListsListComponent,
    ListsCreateComponent,
    TaskList2Component,
    DashboardComponent,
    TaskCreate2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
