import { Task } from '../shared/task.model';

export const tasksSelector = (state: { tasks: Task[] }) => state.tasks;
