/* import { ID } from '..'; */
import { IMatch } from './IMatch';

export interface IMatchesReader<T> {
  findAll(): Promise<T[]>,
  /* findById(id: ID): Promise<T | null>, */
}

export type IMatchModel = IMatchesReader<IMatch>;
