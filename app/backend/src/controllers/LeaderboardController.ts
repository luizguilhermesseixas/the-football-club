import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
