import { createSelector } from "@ngrx/store";


const authStateSelector = state => state.auth;

export const isLoggedIn = createSelector(
    authStateSelector,
    auth => auth.loggedIn,
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
)