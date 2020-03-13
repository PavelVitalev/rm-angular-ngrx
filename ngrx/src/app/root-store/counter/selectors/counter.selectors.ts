import { createSelector } from '@ngrx/store';
import { AppState } from '@root-store/state';
import { State } from '@root-store/counter/state';

const selectCounter = (state: AppState) => {
  // console.log(state);
  return state.counter;
};

export const getCurrentCount = createSelector(
  selectCounter,
  (state: State) => {
    // console.log(state);
    return state.counter;
  }
);


