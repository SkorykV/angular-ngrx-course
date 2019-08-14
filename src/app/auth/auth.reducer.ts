import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../model/user.model';


export interface AuthState {
  loggedIn: boolean,
  user: User,
}

export const authInitialState: AuthState = {
  loggedIn: false,
  user: undefined,
};

export function reducer(state = authInitialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      }
    case AuthActionTypes.LogoutAction:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
      }
    default:
      return state;
  }
}
