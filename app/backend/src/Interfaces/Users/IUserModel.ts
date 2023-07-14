/* import { ICRUDModel } from '../ICRUDModel'; */
import { IUser } from './IUser';

export interface ILoginReader<T> {
  findByEmail(email: string): Promise<T | null>
}

export type IUserModel = ILoginReader<IUser>;
