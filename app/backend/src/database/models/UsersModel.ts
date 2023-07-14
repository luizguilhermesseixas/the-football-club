import SequelizeUsers from './SequelizeUsers';
import { IUser } from '../../Interfaces/Users/IUser';
import { IUserModel } from '../../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user.dataValues;
  }
}
