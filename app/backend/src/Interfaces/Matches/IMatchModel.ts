/* import { ID } from '..'; */
import { ILeaderboard } from '../Leaderboard/ILeaderboard';
import { IMatch, INewMatch } from './IMatch';

export interface IMatchesReader<T> {
  findAll(): Promise<T[]>,
  findMatchesByProgress(q: string): Promise<T[]>,
  update(id: number): void,
  updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number): void,
  insertMatch(newMatch: INewMatch): Promise<IMatch>
  getHomeLeaderboard(): Promise<ILeaderboard[]>
}

export type IMatchModel = IMatchesReader<IMatch>;
