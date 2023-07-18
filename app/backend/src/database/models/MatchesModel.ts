import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
import SequelizeMatches from './SequelizeMatches';
import SequelizeTeams from './SequelizeTeams';
import { IMatch } from '../../Interfaces/Matches/IMatch';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    return this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

/*   async findById(id: ITeam['id']): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (data === null) {
      return null;
    }
    const { teamName } = data;
    return { id, teamName };
  } */
}
