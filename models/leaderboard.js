'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      leaderboard.belongsTo(models.user, { foreignKey:'id_foreign' });
    }
  }
  leaderboard.init({
    id_foreign: DataTypes.INTEGER,
    point_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'leaderboard',
  });
  return leaderboard;
};