// import { ID } from '../Interfaces/index';
import JwtUtils from '../utils/JwtUtils';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import { IFinish, IMatch } from '../Interfaces/Matches/IMatch';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesServices {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
    private jwtUtils = new JwtUtils(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesInProgress(q: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findMatchesByProgress(q);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number, token: string): Promise<ServiceResponse<IFinish>> {
    try {
      this.jwtUtils.decode(token);
      this.matchesModel.update(id);
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
  }
}
