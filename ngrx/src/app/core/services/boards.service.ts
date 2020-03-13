import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Response } from '@app/models/response';
import { Boards } from '@app/models/boards';
import { Board } from '@app/models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(
    private http: HttpClient
  ) { }

  getBoards(): Observable<Response<Boards> | HttpErrorResponse> {
    return this.http.get<Response<Boards> | HttpErrorResponse>(`${environment.apiUrl}/boards`);
  }

  createBoard(title: string): Observable<Response<Board> | HttpErrorResponse> {
    return this.http.post<Response<Board> | HttpErrorResponse>(`${environment.apiUrl}/boards`, {title});
  }

}
