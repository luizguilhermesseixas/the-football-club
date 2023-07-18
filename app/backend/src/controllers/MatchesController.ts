import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
