import { Task } from '../shared/task.model';

export const tasksSelector = (state: { tasks: Task[] }) => state.tasks;

export const tokenSelector = (state: { token: string }) => state.token;
