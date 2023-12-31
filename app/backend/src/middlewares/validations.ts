import { NextFunction, Request, Response } from 'express';
import Email from './validations/email';
import { ILogin } from '../Interfaces/Users/IUser';

class Validations {
  private static passwordMinLength = 6;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }

  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    res.locals.user = token;
    next();
  }
}

export default Validations;
