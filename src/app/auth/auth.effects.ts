import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<AuthActions.Login>(AuthActions.AuthActionTypes.LoginAction),
    tap(
      action => {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    )
  )

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<AuthActions.Logout>(AuthActions.AuthActionTypes.LogoutAction),
    tap( action => { 
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  )

  @Effect()
  index$ = defer(
    () => {
      const user = localStorage.getItem('user');

      if (user) {
        return of(new AuthActions.Login({user: JSON.parse(user)}));
      }
      else {
        return of(new AuthActions.Logout());
      }
    }
  )

  constructor(private actions$: Actions, private router: Router) {}

}
