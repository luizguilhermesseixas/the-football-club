/* import { ID } from '..'; */
import { IMatch } from './IMatch';

export interface IMatchesReader<T> {
  findAll(): Promise<T[]>,
  findMatchesByProgress(q: string): Promise<T[]>,
  update(id: number): void,
  updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number): void
}

export type IMatchModel = IMatchesReader<IMatch>;
