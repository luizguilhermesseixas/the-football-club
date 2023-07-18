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

  public async getMatchesInProgress(q: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findMatchesByProgress(q);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
