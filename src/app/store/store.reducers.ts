import { createReducer, on } from '@ngrx/store';
import { Task } from '../shared/task.model';
import { loadTasks } from './store.actions';

const tasks: Task[] = [];

export const tasksReducer = createReducer(
  tasks,
  on(loadTasks, (state, action) => action.tasks)
);
