import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@root-store/state';
import { BoardsState } from '@root-store/boards/state';
import { Boards } from '@app/models/boards';

const selectBoards = (state: AppState) => state;

export const getBoardsState = createSelector(
  selectBoards,
  (state: AppState): BoardsState => {
    return state.boards;
  }
);

export const getBoards = createSelector(
  selectBoards,
  (state: AppState): Boards => {
    return state.boards.data;
  }
);
