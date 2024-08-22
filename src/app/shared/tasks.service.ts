import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from './env';
import { Store } from '@ngrx/store';
import { tokenSelector } from '../store/store.selectors';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private store: Store<{ token: string }>) {}
  deleteTask(id: number) {
    let token = '';
    this.store.select(tokenSelector).subscribe((state: any) => {
      if (state) {
        token = state.token;
      }
    });
    return axios.delete(env.apiUrl + '/tasks/' + id, {
      headers: { Authorization: token },
    });
  }
}
