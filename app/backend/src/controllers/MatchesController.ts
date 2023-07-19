import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const q = req.query.inProgress;
    if (q) {
      const { status, data } = await this.matchesService
        .getMatchesInProgress(q as string);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const token = res.locals.user;
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishMatch(Number(id), token);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async matchResult(req: Request, res: Response) {
    const token = res.locals.user;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const { status, data } = await this.matchesService
      .matchResult(Number(id), homeTeamGoals, awayTeamGoals, token);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
