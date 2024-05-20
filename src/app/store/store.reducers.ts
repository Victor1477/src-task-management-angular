import { createReducer, on } from '@ngrx/store';
import { Task } from '../shared/task.model';
import { loadTasks, loadToken } from './store.actions';

const tasks: Task[] = [];

export const tasksReducer = createReducer(
  tasks,
  on(loadTasks, (state, action) => action.tasks)
);

export const tokenReducer = createReducer(
  null,
  on(loadToken, (state, action) => action.token)
);
