import { Model, QueryInterface, DataTypes } from 'sequelize';
import { Iteam } from '../../Interfaces/Teams/Iteam';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Iteam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name'
      },
    }/* , {
      underscored: true
    } */);
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};