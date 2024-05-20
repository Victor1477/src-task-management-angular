import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'in-progress',
    component: TasksComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'finished',
    component: TasksComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'form',
    component: TaskFormComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'form/:id',
    component: TaskFormComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'login', component: AuthenticationComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
