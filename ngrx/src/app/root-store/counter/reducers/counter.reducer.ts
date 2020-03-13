import { Action, ActionCreator, createReducer, on } from '@ngrx/store';
import * as CounterActions from '@root-store/counter/actions/counter.actions';

import { initialCounterState, State } from '../state';
// import { CounterActionTypes, CounterActions } from '../actions/counter.actions';

const board2Reducer = createReducer(
  initialCounterState,
  on(CounterActions.incCounter2 as ActionCreator, (state, data) => {
    return { ...state, counter: state.counter + 1 };
  }),
  on(CounterActions.decCounter2 as ActionCreator, (state, data) => {
    return { ...state, counter: state.counter - 1 };
  }),

);

export function counterReducer(state: State | undefined, action: Action) {
  return board2Reducer(state, action);
}

//
// export function counterReducer(state = initialCounterState, action: CounterActions): State {
//   switch (action.type) {
//
//     case CounterActionTypes.IncrementCounters: {
//       console.log(state);
//       return { ...state, counter: state.counter + 1 };
//     }
//
//     case CounterActionTypes.DecrementCounters: {
//       return { ...state, counter: state.counter - 1 };
//     }
//
//     default:
//       return state;
//   }
// }
