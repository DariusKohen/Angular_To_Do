import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListsCreateComponent } from './lists/lists-create/lists-create.component';
import { TaskCreate2Component } from './tasks/task-create2/task-create2.component'

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full'},
  { path: 'new-list', component: ListsCreateComponent },
  { path: 'lists', component: DashboardComponent},
  { path: 'lists/:listId', component: DashboardComponent},
  { path: 'lists/:listId/new-task', component: TaskCreate2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
