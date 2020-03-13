import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs/index';
import { catchError, map, switchMap, take } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { AppState } from '@root-store/state';

import { AuthService } from '@app/core/services/auth.service';
import { BoardService } from '@app/core/services/board.service';

import { CustomActionType } from '@app/models/action';
import { Response } from '@app/models/response';
import { Boards } from '@app/models/boards';
import { Board } from '@app/models/board';
import { User } from '@app/models/user';

import { boardActionTypes } from '@root-store/board/actions/board.actions';
import * as BoardActions from '@root-store/board/actions/board.actions';
import * as BoardsActions from '@root-store/boards/actions/boards.actions';

import { getBoard } from '@root-store/board/selectors/board.selectors';
import { getBoards } from '@root-store/boards/selectors/boards.selectors';
import { getCurrentUser } from '@root-store/auth/selectors/auth.selectors';

@Injectable()
export class BoardEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private as: AuthService,
    private boardService: BoardService,
  ) {
  }

  checkBoard = createEffect(() =>
    this.actions$
      .pipe(
        ofType(boardActionTypes.CheckBoard),
        switchMap((action: CustomActionType) => {
          const boardId = action.data;

          return this.checkStoreBoards().pipe(
            map((data: Boards) => {
              if (!data) {
                return BoardActions.loadBoard({data: action.data});
              }

              const selectdBoard = data.boards.find((board => board._id === boardId));

              if (selectdBoard) {
                return BoardActions.checkBoardSuccess(selectdBoard);
              }

              return BoardActions.loadBoard({data: action.data});
            })
          );
        })
      )
  );

  loadBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.LoadBoard),
      switchMap((action: CustomActionType) => {
        return this.boardService.getBoard(action.data).pipe(
          map((response: Response<Board>) => {
            // console.log(response);
            return BoardActions.loadBoardSuccess(response);
          }),
          catchError((error) => {
            console.log(error);
            return of(BoardActions.loadBoardFailure(error));
          })
        );
      })
    )
  );

  subscribeUserOnBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.SubscribeOnBoard),
      map(() => this.getData()),
      switchMap((data) => data),
      switchMap(([board, user]) => {
        if (!board._id || !user._id) {
          return;
        }

        const updatedBoard = {...board, users: [...board.users]} as Board;

        const isSubscribedUser = updatedBoard.users.some((checkUser) => checkUser._id === user._id);

        if (isSubscribedUser) {
          updatedBoard.users = updatedBoard.users.filter((checkUser) => checkUser._id !== user._id);
        }

        if (!isSubscribedUser) {
          updatedBoard.users.push(user);
        }

        this.boardService.subscribeOnBoard(board._id, user._id).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    ));

  updateBoardTitle = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.UpdateBoardTitle),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((data) => data),
      switchMap((data) => {
        const [board, action] = data;
        const title = action.data;

        const updatedBoard = {...board, title} as Board;

        this.boardService.updateBoardTitle(updatedBoard._id, title).pipe(take(1)).subscribe();

        return of(BoardActions.updateBoardState({data: updatedBoard}));
      })
    )
  );

  deleteBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.DeleteBoard),
      map(() => combineLatest(
        this.getBoards(),
        this.getBoard()
      )),
      switchMap((data) => data),
      switchMap((data) => {
        const [chekedBoards, board] = data;
        let boards = chekedBoards.boards;

        boards = boards.filter((filteredBoard) => filteredBoard._id !== board._id );
        this.boardService.deleteBoard(board._id).pipe(take(1)).subscribe()
        this.router.navigate(['/']);
        return of(BoardsActions.updateBoardsState({boards}));
      })
    )
  );

  dnd = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActionTypes.DragAndDrop),
      map((action: CustomActionType) => combineLatest(
        this.getBoard(),
        of(action)
      )),
      switchMap((action) => action),
      switchMap(([board, {data}]) => {
        const dndData = {
          ...data,
          boardId: board._id
        };

        return this.boardService.dnd(dndData).pipe(
          map((response: Response<Board>) => {
            return BoardActions.updateBoardState({data: response.data});
          }),
          catchError((error) => {
            console.log(error);
            return of(BoardActions.loadBoard({data: board._id}));
          })
        );
      })
    )
  );

  private checkStoreBoards(): Observable<Boards> {
    return this.store.select(getBoards);
  }

  private getData() {
    return combineLatest(
      this.getBoard(),
      this.getCurrentUser()
    );
  }

  private getBoard(): Observable<Board> {
    return this.store.select(getBoard).pipe(take(1));
  }

  private getCurrentUser(): Observable<User> {
    return this.store.select(getCurrentUser).pipe(take(1));
  }

  private getBoards(): Observable<Boards> {
    return this.store.select(getBoards).pipe(take(1))
  }
}
