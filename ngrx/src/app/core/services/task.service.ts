import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '@env/environment';

import { Response } from '@app/models/response';
import { Board } from '@app/models/board';
import { Task } from '@app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  createTask(columnId: string, task: string): Observable<Response<Task> | HttpErrorResponse> {
    return this.http.post<Response<Task> | HttpErrorResponse>(`${environment.apiUrl}/tasks/${columnId}`, {task});
  }

  deleteTask(taskId: string): Observable<Response<any> | HttpErrorResponse> {
    return this.http.delete<Response<any> | HttpErrorResponse>(`${environment.apiUrl}/tasks/${taskId}`);
  }

  updateTaskTitle(taskId: string, task: string): Observable<Response<Task> | HttpErrorResponse> {
    return this.http.put<Response<Task> | HttpErrorResponse>(`${environment.apiUrl}/tasks/${taskId}`, { task });
  }

  updateTaskMarks(taskId: string, mark: string): Observable<Response<Task> | HttpErrorResponse> {
    return this.http.patch<Response<Task> | HttpErrorResponse>(`${environment.apiUrl}/tasks/masks/${taskId}`, { mark });
  }

  updateTaskUsers(taskId: string, userId: string): Observable<Response<Board> | HttpErrorResponse> {
    return this.http.patch<Response<Board> | HttpErrorResponse>(`${environment.apiUrl}/tasks/${taskId}`, { userId });
  }
}
