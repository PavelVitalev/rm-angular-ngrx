import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { environment } from '@env/environment';

import { Response } from '@app/models/response';
import { AuthResponse } from '@app/models/auth';
import { AuthData } from '@app/pages/sign-in/models/sign-in';
import { SignUpData } from '@app/pages/sign-up/models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  logIn(data: AuthData): Observable<Response<AuthResponse> | HttpErrorResponse> {
    return this.http.post<Response<AuthResponse> | HttpErrorResponse>
    (`${environment.apiUrl}/auth/signin`, data);
  }

  signUp(data: SignUpData): Observable<Response<AuthResponse> | HttpErrorResponse> {
    return this.http.post<Response<AuthResponse> | HttpErrorResponse>
    (`${environment.apiUrl}/auth/signup`, data);
  }

  checkLogin(): Observable<Response<AuthResponse> | HttpErrorResponse> {
    return this.http.get<Response<AuthResponse> | HttpErrorResponse>(`${environment.apiUrl}/users/current`);
  }
}
