import { ID } from '..';
import { ITeam } from './ITeam';

export interface ITeamsReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export type ITeamsModel = ITeamsReader<ITeam>;
