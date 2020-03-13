import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs/index';
import { map, switchMap, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { AppState } from '@root-store/state';

import { ColumnService } from '@app/core/services/column.service';

import { CustomActionType } from '@app/models/action';
import { Response } from '@app/models/response';
import { Board } from '@app/models/board';
import { Column } from '@app/models/column';

import { boardActionTypes } from '@root-store/board/actions/board.actions';
import * as BoardActions from '@root-store/board/actions/board.actions';

import { getBoard } from '@root-store/board/selectors/board.selectors';


@Injectable()
export class ColumnEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private columnService: ColumnService
  ) { }

  createColumn = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.CreateColumn),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        const {templateColumnId, columnTitle} = data.data;

        board.columns.push({_id: templateColumnId, title: columnTitle});

        this.columnService.createColumn(board._id, columnTitle)
          .pipe(take(1))
          .subscribe((response: Response<Column>) => {
            board.columns = board.columns.filter((filteredColumn) => filteredColumn._id !== templateColumnId);
            board.columns.push({...response.data});

            this.store.dispatch(BoardActions.updateBoardState({data: board}));
          });

        return of(BoardActions.updateBoardState({data: board}));
      })
    )
  );

  deleteColumn = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.DeleteColumn),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((actionData) => {
        const [board, data]: [Board, CustomActionType] = actionData;
        board.columns = board.columns.filter((filteredColumn) => filteredColumn._id !== data.data);

        this.columnService.deleteColumn(data.data).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: board}));
      })
    )
  );

  updateColumnTitle = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateColumnTitle),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((data) => {
        const [board, action] = data;
        const updatedColumn = action.data;

        board.columns = board.columns.map((column) => {
          if (column._id === updatedColumn._id) {
            return updatedColumn;
          }
          return column;
        });

        this.columnService.updateColumnTitle(updatedColumn._id, updatedColumn.title).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: board}));
      })
    )
  );

  private getBoard(): Observable<Board> {
    return this.store.select(getBoard).pipe(take(1));
  }
}
