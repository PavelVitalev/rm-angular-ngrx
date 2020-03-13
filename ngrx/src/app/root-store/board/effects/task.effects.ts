import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs/index';
import { map, switchMap, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { AppState } from '@root-store/state';

import { TaskService } from '@app/core/services/task.service';

import { CustomActionType } from '@app/models/action';
import { Response } from '@app/models/response';
import { Board } from '@app/models/board';
import { Task } from '@app/models/task';

import { boardActionTypes } from '@root-store/board/actions/board.actions';
import * as BoardActions from '@root-store/board/actions/board.actions';

import { getBoard } from '@root-store/board/selectors/board.selectors';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private taskService: TaskService
  ) {
  }

  createTask = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.CreateTask),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {task, columnId, templateTaskId} = data.data;

        board.columns = board.columns.map((column) => {
          if (column._id === columnId) {
            column.tasks.push({_id: templateTaskId, task});
          }
          return column;
        });

        this.taskService.createTask(columnId, task)
          .pipe(take(1))
          .subscribe((response: Response<Task>) => {
            // console.log(response);
            board.columns = board.columns.map((column) => {
              if (column._id === columnId) {
                column.tasks = column.tasks.filter((filteredTask) => filteredTask._id !== templateTaskId);
                column.tasks.push({...response.data});
              }
              return column;
            });
            this.store.dispatch(BoardActions.updateBoardState({data: board}));
          });

        return of(BoardActions.updateBoardState({data: board}));
      })
    )
  );

  deleteTask = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.DeleteTask),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {columnId, taskId} = data.data;

        board.columns = board.columns.map((column) => {
          if (column._id === columnId) {
            column.tasks = column.tasks.filter((filteredTask) => filteredTask._id !== taskId);
          }

          return column;
        });

        this.taskService.deleteTask(taskId).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: board}));
      })
    )
  );

  updateTaskTitle = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateTaskTitle),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {updatedTask,  columnId} = data.data;

        const updatedBoard = this.updateBoardData(board, updatedTask, columnId);

        this.taskService.updateTaskTitle(updatedTask._id, updatedTask.task).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    )
  );

  updateTaskMarks = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateTaskMarks),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {updatedTask,  columnId, mark} = data.data;

        const updatedBoard = this.updateBoardData(board, updatedTask, columnId);

        this.taskService.updateTaskMarks(updatedTask._id, mark).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    )
  );

  updateTaskUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateTaskUsers),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {updatedTask,  columnId, userId} = data.data;

        const updatedBoard = this.updateBoardData(board, updatedTask, columnId);

        this.taskService.updateTaskUsers(updatedTask._id, userId).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    )
  );

  private getBoard(): Observable<Board> {
    return this.store.select(getBoard).pipe(take(1));
  }

  private updateBoardData(board: Board, updatedTask: Task, columnId: string ): Board {
    board.columns = board.columns.map((column) => {
      if (column._id === columnId) {
        column.tasks = column.tasks.map((task) => {
          if (task._id === updatedTask._id) {
            return updatedTask;
          }

          return task;
        });
      }
      return column;
    });

    return board;
  }
}
