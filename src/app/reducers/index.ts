import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { AuthActions, AuthActionTypes } from '../auth/auth.actions';
import * as fromAuth from '../auth/auth.reducer';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
