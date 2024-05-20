import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStore } from './store/store.actions';
import { tokenSelector } from './store/store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private store: Store) {
    this.store.select(tokenSelector).subscribe((state: any) => {
      if (state) {
        this.isUserLoggedIn = true;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadStore());
  }
}
