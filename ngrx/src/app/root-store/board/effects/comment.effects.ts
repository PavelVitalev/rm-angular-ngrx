import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs/index';
import { map, switchMap, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { AppState } from '@root-store/state';

import { CommentService } from '@app/core/services/comment.service';

import { CustomActionType } from '@app/models/action';
import { Response } from '@app/models/response';
import { Board } from '@app/models/board';
import { Task } from '@app/models/task';
import { Comment } from '@app/models/comment';

import { boardActionTypes } from '@root-store/board/actions/board.actions';
import * as BoardActions from '@root-store/board/actions/board.actions';

import { getBoard } from '@root-store/board/selectors/board.selectors';

@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private commentService: CommentService
  ) {
  }

  createTaskComment = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.CreateTaskComment),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {updatedTask, comment, columnId, templateCommentId} = data.data;

        const updatedBoard = this.updateBoardData(board, updatedTask, columnId);

        this.commentService.createTaskComment(updatedTask._id, comment)
          .pipe(take(1))
          .subscribe((commentResponse: Response<Comment>) => {
            const newComment = commentResponse.data.comment;
            // update board store after comment create response
            updatedTask.comments = updatedTask.comments.filter((filteredComment) => filteredComment._id !== templateCommentId);
            updatedTask.comments.push(newComment);

            const boardWithUpdatedComments = this.updateBoardData(board, updatedTask, columnId);

            this.store.dispatch(BoardActions.updateBoardState({data: boardWithUpdatedComments}));
          });

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    )
  );

  deleteTaskComment = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.DeleteTaskComment),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {updatedTask,  columnId, commentId} = data.data;

        const updatedBoard = this.updateBoardData(board, updatedTask, columnId);

        this.commentService.deleteTaskComment(updatedTask._id, commentId).pipe(take(1)).subscribe();

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
