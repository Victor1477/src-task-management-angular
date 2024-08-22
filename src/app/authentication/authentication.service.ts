import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from '../shared/env';
import { Store } from '@ngrx/store';
import { loadToken } from '../store/store.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private store: Store<{ token: string }>) {}

  login(user: { username: string; password: string }) {
    return axios.post(env.apiUrl + '/users/login', user).then((response) => {
      this.store.dispatch(loadToken({ token: response.data }));
    });
  }
}
