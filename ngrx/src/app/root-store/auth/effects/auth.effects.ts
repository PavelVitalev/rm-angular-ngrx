import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';

import { AuthService } from '@app/core/services/auth.service';

import { CustomActionType } from '@app/models/action';
import { AuthResponse } from '@app/models/auth';
import { Response } from '@app/models/response';
import { Router } from '@angular/router';

import { authActionTypes } from '@root-store/auth/actions/auth.actions';
import * as AuthActions from '@root-store/auth/actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) { }

  logIn$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(authActionTypes.Auth),
        switchMap((action: CustomActionType) => {
          return this.authService.logIn(action.data)
            .pipe(
              map((response: Response<AuthResponse>) => {
                return AuthActions.authSuccess(response);
              }),
              catchError((error) => {
                console.error(error);
                return of(AuthActions.authFailure(error));
              })
            );
        })
      )
  );

  signUp = createEffect(() =>
    this.actions$
      .pipe(
        ofType(authActionTypes.SignUp),
        switchMap((action: CustomActionType) => {
          return this.authService.signUp(action.data)
            .pipe(
              map((response: Response<AuthResponse>) => {
                // console.log(response);
                return AuthActions.signUpSuccess(response);
              }),
              catchError((error) => {
                console.error(error);
                return of(AuthActions.signUpFailure(error));
              })
            );
        })
      )
  );

  logInSuccess = createEffect(() =>
    this.actions$
      .pipe(
        ofType(authActionTypes.AuthSuccess),
        tap((action: CustomActionType) => {
          localStorage.setItem('sessionToken', action.data.token);
          return this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signUpSuccess = createEffect(() =>
    this.actions$
      .pipe(
        ofType(authActionTypes.SignUpSuccess),
        tap((response) => {
          // console.warn(response);
          return this.router.navigate(['/sign-in']);
        })
      ),
    { dispatch: false }
    );

  @Effect()
  checkAuthByToken = createEffect(() =>
    this.actions$
      .pipe(
        ofType(authActionTypes.ChechAuthByToken),
        switchMap(() => {
          return this.authService.checkLogin().pipe(
            map((response: Response<AuthResponse>) => {
              // console.log(response);
              return AuthActions.chechAuthByTokenSuccess(response);
            }),
            catchError((error) => {
              console.error(error);
              return of(AuthActions.chechAuthByTokenFailure(error));
            })
          );
        })
      )
  );

  logOut = createEffect(() =>
      this.actions$
        .pipe(
          ofType(authActionTypes.LogOut),
          tap(() => {
            localStorage.removeItem('sessionToken');
            return this.router.navigate(['/sign-in']);
          })
        ),
    { dispatch: false }
  );
}
