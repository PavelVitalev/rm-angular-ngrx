import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';

const counterTypes = {
  inc: '[Counter2] Inrement',
  dec: '[Counter2] Decrement'
}

export const incCounter2 = createAction(
  counterTypes.inc,
  props<{data: string}>()
);
export const decCounter2 = createAction(
  counterTypes.dec,
  // (testData: any) => testData
  props<{data: any}>()
);
//
// export enum CounterActionTypes {
//   IncrementCounters = '[Counter] Inrement',
//   DecrementCounters = '[Counter] Decrement'
// }
//
// export class IncrementCounters implements Action {
//   readonly type = CounterActionTypes.IncrementCounters;
// }
//
// export class DecrementCounters implements Action {
//   readonly type = CounterActionTypes.DecrementCounters;
// }
//
// export type CounterActions = IncrementCounters | DecrementCounters;

