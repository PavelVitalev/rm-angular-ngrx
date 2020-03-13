import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';

import { AuthDataRequst, AuthResponse } from '@app/models/auth';
import { Response } from '@app/models/response';
import { AuthData } from '@app/pages/sign-in/models/sign-in';

export const authActionTypes = {
  Auth: '[Auth] Login',
  AuthSuccess: '[Auth] Login Success',
  AuthFailure: '[Auth] Login Failure',

  SignUp: '[SignUp] Login',
  SignUpSuccess: '[SignUp] Login Success',
  SignUpFailure: '[SignUp] Login Failure',

  ChechAuthByToken: '[Auth] ChechAuthByToken',
  ChechAuthByTokenSuccess: '[Auth] ChechAuthByToken Success',
  ChechAuthByTokenFailure: '[Auth] ChechAuthByToken Failure',

  LogOut: '[Auth] LogOut',
};

export const auth = createAction(
  authActionTypes.Auth,
  props<{data: AuthDataRequst}>()
);

export const authSuccess = createAction(
  authActionTypes.AuthSuccess,
  props<Response<AuthResponse>>()
);

export const authFailure = createAction(
  authActionTypes.AuthFailure,
  props<{data: HttpErrorResponse}>()
);

export const signUp = createAction(
  authActionTypes.SignUp,
  props<{data: AuthData}>()
);

export const signUpSuccess = createAction(
  authActionTypes.SignUpSuccess,
  props<Response<AuthResponse>>()
);

export const signUpFailure = createAction(
  authActionTypes.SignUpFailure,
  props<{data: HttpErrorResponse}>()
);

export const chechAuthByToken = createAction(
  authActionTypes.ChechAuthByToken
);

export const chechAuthByTokenSuccess = createAction(
  authActionTypes.ChechAuthByTokenSuccess,
  props<Response<AuthResponse>>()
);

export const chechAuthByTokenFailure = createAction(
  authActionTypes.ChechAuthByTokenFailure,
  props<{data: HttpErrorResponse}>()
);

export const logOut = createAction(
  authActionTypes.LogOut,
);
