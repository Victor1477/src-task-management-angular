import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { loadStore, loadTasks } from './store.actions';
import { Subject, switchMap } from 'rxjs';
import { Task } from '../shared/task.model';
import axios from 'axios';
import { env } from '../shared/env';
import { retry } from '../utils/functions';
import { tokenSelector } from './store.selectors';

@Injectable()
export class TasksEffects {
  loadTasks = createEffect(() =>
    this.actions.pipe(
      ofType(loadStore),
      switchMap(() => {
        const loadTasksObs = new Subject<Action>();
        this.store.select(tokenSelector).subscribe((state: any) => {
          if (state) {
            retry(axios.get, 0, 2000, env.apiUrl + '/tasks', {
              headers: { Authorization: state.token },
            }).then((result: { data: Task[] }) => {
              loadTasksObs.next(loadTasks({ tasks: result.data }));
            });
          }
        });

        return loadTasksObs;
      })
    )
  );

  constructor(
    private actions: Actions,
    private store: Store<{ token: string }>
  ) {}
}
