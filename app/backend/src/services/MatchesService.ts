// import { ID } from '../Interfaces/index';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import { IMatch } from '../Interfaces/Matches/IMatch';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesServices {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

/*   public async getTeamById(id: ID): Promise<ServiceResponse<ITeam | null>> {
    const findTeam = await this.teamsModel.findById(id);
    if (!findTeam) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: findTeam };
  } */
}
