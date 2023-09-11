import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from './env';

@Injectable({ providedIn: 'root' })
export class TasksService {
  deleteTask(id: number) {
    return axios.delete(env.apiUrl, { headers: { id: id } });
  }
}
