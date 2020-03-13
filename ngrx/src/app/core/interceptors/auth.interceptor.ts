import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      sessionToken = '';
      this.router.navigate(['/']);
    }

    const authReq = request.clone({
      headers: request.headers.set('authorization', `${sessionToken}`)
    });


    return next.handle(authReq).pipe(
      tap(
        (event) => {
          // console.log(event);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 401) {
            this.router.navigate(['/sign-in']);
          }

          if (err.status === 404 && err.statusText === 'Not Found') {
            this.router.navigate(['/']);
          }
        })
    );
  }
}
