import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '@env/environment';

import { Response } from '@app/models/response';
import { Column } from '@app/models/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(
    private http: HttpClient
  ) { }

  createColumn(boardId: string, title: string): Observable<Response<Column> | HttpErrorResponse> {
    return this.http.post<Response<Column> | HttpErrorResponse>(`${environment.apiUrl}/columns/${boardId}`, {title});
  }

  deleteColumn(columnId: string): Observable<Response<any> | HttpErrorResponse> {
    return this.http.delete<Response<any> | HttpErrorResponse>(`${environment.apiUrl}/columns/${columnId}`);
  }

  updateColumnTitle(columnId: string, title: string): Observable<Response<Column> | HttpErrorResponse> {
    return this.http.put<Response<Column> | HttpErrorResponse>(`${environment.apiUrl}/columns/${columnId}`, { title });
  }
}
