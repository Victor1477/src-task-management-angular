import { createAction, props } from '@ngrx/store';
import { Task } from '../shared/task.model';

export const loadStore = createAction('[Store] loadStore');

export const loadTasks = createAction(
  '[Tasks] loadTasks',
  props<{ tasks: Task[] }>()
);

export const loadToken = createAction(
  '[Store] loadToken',
  props<{ token: string }>()
);
