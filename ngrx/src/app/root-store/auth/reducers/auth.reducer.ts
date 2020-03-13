import { Action, ActionCreator, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { initialAuthState, Auth } from '@root-store/auth/state';

import * as AuthActions from '@root-store/auth/actions/auth.actions';

const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.auth as ActionCreator, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: null,
      isFetching: true
    };
  }),

  on(AuthActions.authSuccess as ActionCreator, (state, data) => {
    return {
    ...state,
    ...data,
      isAuthenticated: true,
      errorMessage: null,
      isFetching: false,
    };
  }),

  on(AuthActions.authFailure as ActionCreator, (state, data) => {
    const error = data as HttpErrorResponse;
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: error.error.message,
      isFetching: false,
    };
  }),

  on(AuthActions.signUp as ActionCreator, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: null,
      isFetching: true,
    };
  }),
  on(AuthActions.signUpSuccess as ActionCreator, (state, data) => {
    return {
      ...state,
      ...data,
      isAuthenticated: true,
      errorMessage: null,
      isFetching: false,
    };
  }),
  on(AuthActions.signUpFailure as ActionCreator, (state, data) => {
    const error = data as HttpErrorResponse;
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: error.error.message,
      isFetching: false,
    };
  }),

  on(AuthActions.chechAuthByToken as ActionCreator, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: null,
      isFetching: true,
    };
  }),
  on(AuthActions.chechAuthByTokenSuccess as ActionCreator, (state, data) => {
    return {
      ...state,
      ...data,
      isAuthenticated: true,
      errorMessage: null,
      isFetching: false,
    };
  }),
  on(AuthActions.chechAuthByTokenFailure as ActionCreator, (state, data) => {
    const error = data as HttpErrorResponse;
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: error.error.message,
      isFetching: false,
    };
  }),

);

export function reducer(state: Auth | undefined, action: Action) {
  return authReducer(state, action);
}
