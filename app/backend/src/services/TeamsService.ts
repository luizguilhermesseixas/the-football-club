import { ID } from '../Interfaces/index';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ITeam } from '../Interfaces/Teams/ITeam';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsServices {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ID): Promise<ServiceResponse<ITeam | null>> {
    const findTeam = await this.teamsModel.findById(id);
    if (!findTeam) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: findTeam };
  }
}
