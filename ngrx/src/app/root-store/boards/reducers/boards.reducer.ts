import { Action, ActionCreator, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import * as BoardsActionTypes from '@root-store/boards/actions/boards.actions';

import { initialState, BoardsState } from '@root-store/boards/state';
import { Board } from '@app/models/board';
import { Response } from '@app/models/response';

const boardsReducer = createReducer(
  initialState,
  on(BoardsActionTypes.loadBoards as ActionCreator, (state) => {
    return {
      ...state,
      errorMessage: null,
      isFetching: true,
      data: null,
    };
  }),

  on(BoardsActionTypes.loadBoardsSuccess as ActionCreator, (state, data) => {
    return {
      ...state,
      ...data,
      errorMessage: null,
      isFetching: false,
    } as BoardsState;
  }),

  on(BoardsActionTypes.loadBoardsFailure as ActionCreator, (state, data) => {
    const error = data as HttpErrorResponse;
    return {
      ...state,
      errorMessage: error.error.message,
      isFetching: false,
    } as BoardsState;
  }),
  on(BoardsActionTypes.openBoardCreator as ActionCreator, (state) =>
    ({ ...state, isOpenBoardCreator: true} as BoardsState)
  ),
  on(BoardsActionTypes.closeBoardCreator as ActionCreator, (state) =>
    ({ ...state, isOpenBoardCreator: false} as BoardsState)
  ),
  on(BoardsActionTypes.createBoard as ActionCreator, (state) =>
    ({ ...state, isFetching: true} as BoardsState)
  ),
  on(BoardsActionTypes.createBoardSuccess as ActionCreator, (state, data) => {
      state.data.boards.push(data);
      return {
        ...state, isFetching: false
      } as BoardsState;
    }
  ),
  on(BoardsActionTypes.createBoardFailure as ActionCreator, (state, data) => {
      const error = data as HttpErrorResponse;
      return {
        ...state,
        errorMessage: error.error.message,
        isFetching: false,
      } as BoardsState;
    }
  ),
  on(BoardsActionTypes.checkBoardsSuccess as ActionCreator, (state) =>
    ({ ...state } as BoardsState)
  ),
  on(BoardsActionTypes.updateBoardsState as ActionCreator, (state, data) =>
    ({ ...state, data} as BoardsState)
  )

);

export function reducer(state: BoardsState | undefined, action: Action) {
  return boardsReducer(state, action);
}
