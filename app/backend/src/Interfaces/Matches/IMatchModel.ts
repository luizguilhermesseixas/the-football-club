/* import { ID } from '..'; */
import { IMatch } from './IMatch';

export interface IMatchesReader<T> {
  findAll(): Promise<T[]>,
  findMatchesByProgress(q: string): Promise<T[]>,
}

export type IMatchModel = IMatchesReader<IMatch>;
