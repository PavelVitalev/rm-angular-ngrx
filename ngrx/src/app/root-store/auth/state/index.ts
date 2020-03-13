import { AuthResponse } from '@app/models/auth';

export interface Auth {
  isAuthenticated: boolean;
  errorMessage: any;
  isFetching: boolean;
  success?: boolean;
  data: AuthResponse;
}

export const initialAuthState: Auth = {
  isAuthenticated: false,
  errorMessage: null,
  isFetching: false,
  success: false,
  data: null,
};
