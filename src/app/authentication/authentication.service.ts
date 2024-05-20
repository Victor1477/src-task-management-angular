import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from '../shared/env';
import { Store } from '@ngrx/store';
import { loadToken } from '../store/store.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private store: Store<{ token: string }>) {}

  login(user: { name: string; password: string }) {
    return axios.post(env.apiUrl + '/authenticate', user).then((response) => {
      this.store.dispatch(loadToken({ token: response.data }));
    });
  }
}
