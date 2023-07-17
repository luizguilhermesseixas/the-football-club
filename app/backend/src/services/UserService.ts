import * as bcrypt from 'bcryptjs';
import JwtUtils from '../utils/JwtUtils';
import { ILogin, IRole, /* IUser, */ IToken } from '../Interfaces/Users/IUser';
import UsersModel from '../database/models/UsersModel';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserServices {
  constructor(
    private usersModel: IUserModel = new UsersModel(),
    private jwtUtils = new JwtUtils(),
  ) { }

  public async login(userData: ILogin): Promise<ServiceResponse<IToken | null>> {
    const findUser = await this.usersModel.findByEmail(userData.email);
    if (!findUser || !bcrypt.compareSync(userData.password, findUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = this.jwtUtils.sign({
      email: findUser.email,
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(token: string): Promise<ServiceResponse<IRole | null>> {
    try {
      const decoded = this.jwtUtils.decode(token);
      const user = await this.usersModel.findByEmail(decoded.email);
      if (user === null) {
        return { status: 'NOT_FOUND', data: { message: 'user not found' } };
      }
      return { status: 'SUCCESSFUL', data: { role: user.role } };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
  }
}
