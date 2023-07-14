import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const userData = req.body;
    const { status, data } = await this.userService.login(userData);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
