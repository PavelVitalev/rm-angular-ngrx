import { HttpErrorResponse } from '@angular/common/http';
import { Action, ActionCreator, createReducer, on } from '@ngrx/store';

import { BoardState, initialState } from '@root-store/board/state';
import * as BoardActions from '@root-store/board/actions/board.actions';

const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadBoard as ActionCreator, (state) => {
    return {
      ...state,
      errorMessage: null,
      isFetching: true
    } as BoardState;
  }),

  on(BoardActions.loadBoardSuccess as ActionCreator, (state, data) => {
    return {
      ...state,
      ...data,
      errorMessage: null,
      isFetching: false
    } as BoardState;
  }),

  on(BoardActions.loadBoardFailure as ActionCreator, (state, data) => {
    const error = data as HttpErrorResponse;
    return {
      ...state,
      errorMessage: error.error.message,
      isFetching: false,
    } as BoardState;
  }),

  on(BoardActions.checkBoardSuccess as ActionCreator, (state, data) => ({ ...state, data } as BoardState)),

  on(BoardActions.updateBoardState as ActionCreator, (state, data) => ({ ...state, data } as BoardState)),

  on(BoardActions.deleteBoard as ActionCreator, (state) => {
    return {
      ...state,
      errorMessage: null,
      // isFetching: true
    } as BoardState;
  }),

  on(BoardActions.deleteBoardSuccess as ActionCreator, (state) => {
    return {
      ...state,
      errorMessage: null,
      isFetching: false
    } as BoardState;
  }),

  on(BoardActions.deleteBoardFailure as ActionCreator, (state) => {
    return {
      ...state,
      isFetching: false,
    } as BoardState;
  }),
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
