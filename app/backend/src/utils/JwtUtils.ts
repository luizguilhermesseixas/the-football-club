import * as jwt from 'jsonwebtoken';
import { IPayload } from '../Interfaces/Users/IUser';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'secret';
  private jwtOptions: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  sign(payload: IPayload): string {
    const token = jwt.sign(payload, this.jwtSecret, this.jwtOptions);
    return token;
  }
}
