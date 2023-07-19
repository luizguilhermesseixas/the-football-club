/* import { ID } from '..'; */
import { IMatch, INewMatch } from './IMatch';

export interface IMatchesReader<T> {
  findAll(): Promise<T[]>,
  findMatchesByProgress(q: string): Promise<T[]>,
  update(id: number): void,
  updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number): void,
  insertMatch(newMatch: INewMatch): Promise<IMatch>
}

export type IMatchModel = IMatchesReader<IMatch>;
