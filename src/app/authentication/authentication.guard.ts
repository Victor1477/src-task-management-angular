import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { tokenSelector } from '../store/store.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ token: string }>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const observable = new Subject<boolean>();
    this.store.select(tokenSelector).subscribe((state: any) => {
      setTimeout(() => {
        if (!state) {
          this.router.navigate(['/login']);
          observable.next(false);
        }
        observable.next(true);
      }, 10);
    });
    return observable;
  }
}
