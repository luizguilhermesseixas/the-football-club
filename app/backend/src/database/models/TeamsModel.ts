import { ITeamsModel } from '../../Interfaces/Teams/ITeamsModel';
import SequelizeTeams from './SequelizeTeams';
import { ITeam } from '../../Interfaces/Teams/ITeam';
/* import { ID } from '../../Interfaces/index'; */
/* import { NewEntity } from '../../Interfaces'; */

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (data === null) {
      return null;
    }
    const { teamName } = data;
    return { id, teamName };
  }
}
