import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '@env/environment';

import { Response } from '@app/models/response';
import { Comment } from '@app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  createTaskComment(taskId: string, comment: any): Observable<Response<Comment> | HttpErrorResponse> {
    return this.http.post<Response<Comment> | HttpErrorResponse>(`${environment.apiUrl}/comments/${taskId}`, { ...comment });
  }

  deleteTaskComment(taskId: string, commentId: string): Observable<Response<any> | HttpErrorResponse> {
    return this.http.request<Response<any> | HttpErrorResponse>
    ('delete', `${environment.apiUrl}/comments/${commentId}`, {body: {taskId}});
  }
}
