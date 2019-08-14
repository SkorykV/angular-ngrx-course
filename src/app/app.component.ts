import {Component, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import { AppState } from './reducers';
import * as authActions from './auth/auth.actions';
import { AuthState } from './auth/auth.reducer';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private isLoggedIn$: Observable<boolean>;
    private isLoggedOut$: Observable<boolean>;
    private authSubscription: Subscription;


    constructor(
      private store: Store<AppState>,
      private router: Router
    ) {

    }

    ngOnInit() {
      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedIn)
      )
      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
      )
    }

    logout() {
      this.store.dispatch(new authActions.Logout());
      this.router.navigateByUrl('/login');
    }


}
