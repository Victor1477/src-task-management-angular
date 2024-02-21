import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { env } from './shared/env';

const routes: Routes = [
  { path: env.Urls.allTasks, component: TasksComponent },
  { path: env.Urls.inProgressTasks, component: TasksComponent },
  { path: env.Urls.finishedTasks, component: TasksComponent },
  { path: env.Urls.newTask, component: TaskFormComponent },
  { path: `${env.Urls.newTask}/:id`, component: TaskFormComponent },
  { path: '**', redirectTo: '/tasks' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
