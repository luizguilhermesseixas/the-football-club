import { Identifiable } from '..';

export interface ILogin {
  email: string;
  password: string;
}

// usuário completo
export interface IUser extends Identifiable, ILogin {
  username: string
  role: string
}

export interface IToken {
  token: string
}

export interface IPayload {
  email: string;
}

export interface IRole {
  role: string
}
// usuário a ser retornado pela API
/* export type IUserResponse = Omit<IUser, 'password'>; */
