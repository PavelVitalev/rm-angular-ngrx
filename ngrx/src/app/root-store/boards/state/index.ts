import { Boards } from '@app/models/boards';

export interface BoardsState {
  errorMessage: any;
  isFetching: boolean;
  success?: boolean;
  data: Boards;
  type?: string;
  isOpenBoardCreator: boolean;
}

export const initialState: BoardsState = {
  errorMessage: null,
  isFetching: false,
  success: false,
  data: null,
  isOpenBoardCreator: false
};
