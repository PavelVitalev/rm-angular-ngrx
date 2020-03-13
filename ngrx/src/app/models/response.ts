export class Response<T> {
  success: boolean;
  data: T;
  type?: string;
}

export class DeleteBoardResponse {
  success: boolean;
  data: any;
}
