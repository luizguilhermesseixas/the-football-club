import { IMatchModel } from '../../Interfaces/Matches/IMatchModel';
import SequelizeMatches from './SequelizeMatches';
import SequelizeTeams from './SequelizeTeams';
import { IMatch } from '../../Interfaces/Matches/IMatch';

const { attributes, include } = {
  attributes: { exclude: ['home_team_id', 'away_team_id'] },
  include: [
    { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
};

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

  async findMatchesByProgress(q: string): Promise<IMatch[]> {
    if (q === 'true') {
      return this.model.findAll({
        where: { inProgress: true },
        attributes,
        include,
      });
    }
    return this.model.findAll({
      where: { inProgress: false },
      attributes,
      include,
    });
  }

  async update(id: number) {
    this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
