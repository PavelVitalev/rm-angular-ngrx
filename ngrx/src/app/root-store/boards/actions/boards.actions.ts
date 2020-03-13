import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Response } from '@app/models/response';
import { Boards } from '@app/models/boards';
import { Board } from '@app/models/board';

export const boardsActionTypes = {
  LoadBoards: '[Boards] Load Boards',
  LoadBoardsSuccess: '[Boards] Load Boards Success',
  LoadBoardsFailure: '[Boards] Load Boards Failure',

  OpenBoardCreator: '[Boards] Open Board Creator',
  CloseBoardCreator: '[Boards] Close Board Creator',
  CreateBoard: '[Boards] Create Board ',
  CreateBoardSuccess: '[Boards] Create Board Success',
  CreateBoardFailure: '[Boards] Create Board Failure',

  CheckBoards: '[Boards] Check Boards',
  CheckBoardsSuccess: '[Boards] Check Boards Success',

  UpdateBoardsState: '[Boards] Update State',
};

export const loadBoards = createAction(
  boardsActionTypes.LoadBoards
);

export const loadBoardsSuccess = createAction(
  boardsActionTypes.LoadBoardsSuccess,
  props<Response<Boards>>()
);

export const loadBoardsFailure = createAction(
  boardsActionTypes.LoadBoardsFailure,
  props<{data: HttpErrorResponse}>()
);

export const openBoardCreator = createAction(
  boardsActionTypes.OpenBoardCreator
);

export const closeBoardCreator = createAction(
  boardsActionTypes.CloseBoardCreator
);

export const createBoard = createAction(
  boardsActionTypes.CreateBoard,
  props<{data: any}>()
);

export const createBoardSuccess = createAction(
  boardsActionTypes.CreateBoardSuccess,
  props<Board>()
);

export const createBoardFailure = createAction(
  boardsActionTypes.CreateBoardFailure,
  props<{data: any}>()
);

export const checkBoards = createAction(
  boardsActionTypes.CheckBoards
);

export const checkBoardsSuccess = createAction(
  boardsActionTypes.CheckBoardsSuccess,
  props<Boards>()
);

export const updateBoardsState = createAction(
  boardsActionTypes.UpdateBoardsState,
  props<Boards>()
);
