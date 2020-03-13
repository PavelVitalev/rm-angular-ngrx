import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@root-store/state';

import { Board } from '@app/models/board';
import { BoardState } from '@root-store/board/state';
import { User } from '@app/models/user';

const selectBoards = (state: AppState) => state;

export const getBoardState = createSelector(
  selectBoards,
  (state: AppState): BoardState => {
    return state.board;
  }
);

export const getBoard = createSelector(
  selectBoards,
  (state: AppState): Board => {
    return state.board.data;
  }
);

export const getBoardSubscribedUsers = createSelector(
  selectBoards,
  (state: AppState): User[] => {
    if (state.board.data && state.board.data.users) {
      return state.board.data.users;
    }
  }
);
