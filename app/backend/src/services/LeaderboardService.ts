import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import MatchesModel from '../database/models/MatchesModel';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) {}

  public async getHomeLeaderboard(): Promise<ServiceResponse<ILeaderboard>> {
    const [result] = await this.matchesModel.getHomeLeaderboard();
    return { status: 'SUCCESSFUL', data: result };
  }
}
