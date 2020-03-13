import { RouterReducerState } from '@ngrx/router-store';

import { CounterState } from '@root-store/counter';
import { Auth } from '@root-store/auth/state';
import { BoardsState } from '@root-store/boards/state';
import { BoardState } from '@root-store/board/state';

export interface AppState {
  readonly router?: RouterReducerState;
  readonly counter: CounterState.State;
  readonly auth?: Auth;
  readonly boards: BoardsState;
  readonly board: BoardState;
}
