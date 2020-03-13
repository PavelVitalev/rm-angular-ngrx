import { Board } from '@app/models/board';

export interface BoardState {
  errorMessage: any;
  isFetching: boolean;
  success?: boolean;
  data: Board;
  type?: string;
}

export const initialState: BoardState = {
  errorMessage: null,
  isFetching: false,
  success: false,
  data: null,
};
