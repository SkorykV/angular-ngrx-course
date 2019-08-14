import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "../auth/auth.selectors";
import { take, map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CoursesGuardService implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select('auth').pipe(
            map(state => state.loggedIn),
            // take(1),
            tap(
               loggedIn => {
                   console.log('executed')
                   if (!loggedIn) {
                       this.router.navigateByUrl('/login');
                   }
               } 
            )
        )
    }
}