import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '@env/environment';

import { DeleteBoardResponse, Response } from '@app/models/response';
import { Board, DNDData } from '@app/models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) { }

  getBoard(boardId: string): Observable<Response<Board> | HttpErrorResponse> {
    return this.http.get<Response<Board> | HttpErrorResponse>(`${environment.apiUrl}/boards/${boardId}`);
  }

  subscribeOnBoard(boardId: string, userId: string): Observable<Response<Board> | HttpErrorResponse> {
    return this.http.patch<Response<Board> | HttpErrorResponse>(`${environment.apiUrl}/boards/${boardId}`, {userId});
  }

  updateBoardTitle(boardId: string, title: string): Observable<Response<Board> | HttpErrorResponse> {
    return this.http.put<Response<Board> | HttpErrorResponse>(`${environment.apiUrl}/boards/${boardId}`, { title });
  }

  deleteBoard(boardId: string): Observable<DeleteBoardResponse | HttpErrorResponse> {
    return this.http.delete<DeleteBoardResponse | HttpErrorResponse>(`${environment.apiUrl}/boards/${boardId}`);
  }

  dnd(data: DNDData) {
    return this.http.patch(`${environment.apiUrl}/tasks`, { ...data });
  }
}
