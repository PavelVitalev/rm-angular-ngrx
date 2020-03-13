import { User } from '@app/models/user';

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface AuthDataRequst {
  email: string;
  password: string;
}
