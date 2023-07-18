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
}
