import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Response } from '@app/models/response';
import { Board, DNDData } from '@app/models/board';
import { Column } from '@app/models/column';
import { Task } from '@app/models/task';

export const boardActionTypes = {
  LoadBoard: '[Board] Load Board',
  LoadBoardSuccess: '[Board] Load Board Success',
  LoadBoardFailure: '[Board] Load Board Failure',

  CheckBoard: '[Board] Check Board',
  CheckBoardSuccess: '[Board] Check Board Success',

  UpdateBoardState: '[Board] Update Board State',

  SubscribeOnBoard: '[Board] Subscribe On Board',

  UpdateBoardTitle: '[Board] Update Board Title',

  DeleteBoard: '[Board] Delete Board',
  DeleteBoardSuccess: '[Board] Delete Board Success',
  DeleteBoardFailure: '[Board] Delete Board Failure',

  DragAndDrop: '[Board] DragAndDrop',

  CreateColumn: '[Board] Create Column',
  DeleteColumn: '[Board] Delete Column',
  UpdateColumnTitle: '[Board] Update Column Title',
  CreateTask: '[Board] Create Task',
  DeleteTask: '[Board] Delete Task',

  UpdateTaskTitle: '[Board] Update Task Title',
  UpdateTaskMarks: '[Board] Update Task Marks',
  UpdateTaskUsers: '[Board] Update Task Users',

  CreateTaskComment: '[Board] Create Task Comment' ,
  DeleteTaskComment: '[Board] Delete Task Comment' ,

};

export const loadBoard = createAction(
  boardActionTypes.LoadBoard,
  props<{data: string}>()
);

export const loadBoardSuccess = createAction(
  boardActionTypes.LoadBoardSuccess,
  props<Response<Board>>()
);

export const loadBoardFailure = createAction(
  boardActionTypes.LoadBoardFailure,
  props<{data: HttpErrorResponse}>()
);

export const checkBoard = createAction(
  boardActionTypes.CheckBoard,
  props<{data: string}>()
);

export const checkBoardSuccess = createAction(
  boardActionTypes.CheckBoardSuccess,
  props<Board>()
);

export const updateBoardState = createAction(
  boardActionTypes.UpdateBoardState,
  props<{data: Board}>()
);

export const subscribeOnBoard = createAction(
  boardActionTypes.SubscribeOnBoard
);

export const updateBoardTitle = createAction(
  boardActionTypes.UpdateBoardTitle,
  props<{data: string}>()
);

export const deleteBoard = createAction(
  boardActionTypes.DeleteBoard
);

export const deleteBoardSuccess = createAction(
  boardActionTypes.DeleteBoardSuccess
);

export const deleteBoardFailure = createAction(
  boardActionTypes.DeleteBoardFailure
);

export const dragAndDrop = createAction(
  boardActionTypes.DragAndDrop,
  props<{data: DNDData}>()
);

export const createColumn = createAction(
  boardActionTypes.CreateColumn,
  props<{data: any}>()
);

export const deleteColumn = createAction(
  boardActionTypes.DeleteColumn,
  props<{data: string}>()
);

export const updateColumnTitle = createAction(
  boardActionTypes.UpdateColumnTitle,
  props<{data: Column}>()
);

export const createTask = createAction(
  boardActionTypes.CreateTask,
  props<{data: any}>()
);

export const deleteTask = createAction(
  boardActionTypes.DeleteTask,
  props<{data: any}>()
);

export const updateTaskTitle = createAction(
  boardActionTypes.UpdateTaskTitle,
  props<{data: any}>()
);

export const updateTaskMarks = createAction(
  boardActionTypes.UpdateTaskMarks,
  props<{data: any}>()
);

export const updateTaskUsers = createAction(
  boardActionTypes.UpdateTaskUsers,
  props<{data: any}>()
);

export const createTaskComment = createAction(
  boardActionTypes.CreateTaskComment,
  props<{data: any}>()
);

export const deleteTaskComment = createAction(
  boardActionTypes.DeleteTaskComment,
  props<{data: any}>()
);


