import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import SequelizeTeams from './SequelizeTeams';

import db from '.';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeTeams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Matches.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
