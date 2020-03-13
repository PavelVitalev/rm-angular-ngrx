import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { combineLatest, Observable, of } from 'rxjs/index';
import { catchError, map, switchMap, take } from 'rxjs/internal/operators';

import { BoardsService } from '@app/core/services/boards.service';

import { CustomActionType } from '@app/models/action';
import { AppState } from '@root-store/state';
import { Response } from '@app/models/response';
import { Boards } from '@app/models/boards';

import { boardsActionTypes } from '@root-store/boards/actions/boards.actions';
import * as BoardsActions from '@root-store/boards/actions/boards.actions';

import { getBoards } from '@root-store/boards/selectors/boards.selectors';
import { boardActionTypes } from '@root-store/board/actions/board.actions';
import { Board } from '@app/models/board';

@Injectable()
export class BoardsEffects {

  constructor(
    private actions$: Actions,
    private boardsService: BoardsService,
    private store: Store<AppState>
  ) { }

  checkBoards = createEffect(() =>
    this.actions$
      .pipe(
        ofType(boardsActionTypes.CheckBoards),
        switchMap(() => {
          return this.checkStoreBoards().pipe(
            map((boards: Boards) => {
              if (boards !== null && boards.boards.length) {
                return BoardsActions.checkBoardsSuccess(boards);
              } else {
                return BoardsActions.loadBoards();
              }
            })
          );
        })
      )
  );

  loadBoards = createEffect(() =>
    this.actions$
      .pipe(
        ofType(boardsActionTypes.LoadBoards),
        switchMap(() => {
          return this.boardsService.getBoards().pipe(
            map((response: Response<Boards>) => {
              // console.log(response);
              return BoardsActions.loadBoardsSuccess(response);
            }),
            catchError((error) => {
              console.log(error);
              return of(BoardsActions.loadBoardsFailure(error));
            })
          );
        })
      ));

  updatedBoards = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateBoardState),
      switchMap((actiond: CustomActionType) => {
        const updatedBoard = actiond.data;

        return this.checkStoreBoards().pipe(
          map((boards: Boards) => {
            if (boards !== null && boards.boards.length) {
              boards.boards = boards.boards.map((board) => {
                if (board._id === updatedBoard._id) {
                  return updatedBoard;
                }
                return board;
              });
              return BoardsActions.updateBoardsState(boards);
            } else {
              return BoardsActions.loadBoards();
            }
          })
        );
      })
    ));

  createBoard = createEffect(() =>
    this.actions$
      .pipe(
        ofType(boardsActionTypes.CreateBoard),
        switchMap((actionData: CustomActionType) => {

          return this.boardsService.createBoard(actionData.data).pipe(
            map((response: Response<any>) => {
              const newBoard = response.data.board as Board;
              return BoardsActions.createBoardSuccess(newBoard);
            })
          );
        })
      ));

  checkStoreBoards(): Observable<Boards> {
    return this.store.select(getBoards).pipe(take(1));
  }

}
