import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@root-store/state';
import { Auth } from '@root-store/auth/state';
import * as AuthSelectors from '@root-store/auth/selectors/auth.selectors';
import { User } from '@app/models/user';

const selectAuth = (state: AppState) => {
  // console.log(state);
  return state;
};

export const getStore = createSelector(
  selectAuth,
  (state: AppState): AppState => state
);

export const getAuth = createSelector(
  selectAuth,
  (state: AppState): Auth => {
    return state.auth;
  }
);

export const getIsAuthenticated = createSelector(
  selectAuth,
  (state: AppState): boolean => {
    return state.auth.isAuthenticated;
  }
);

export const getCurrentUser = createSelector(
  selectAuth,
  (state: AppState): User => {
    if (state.auth && state.auth.data && state.auth.data.user) {
      return state.auth.data.user;
    }
  }
);
