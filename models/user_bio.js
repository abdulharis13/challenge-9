'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_bio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_bio.belongsTo(models.user, { foreignKey:'id_foreign' });
    }
  }
  user_bio.init({
    id_foreign: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    socialMedia: DataTypes.STRING,
    aboutMe: DataTypes.TEXT,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_bio',
  });
  return user_bio;
};