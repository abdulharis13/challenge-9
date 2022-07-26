'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game1s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_foreign: {
        type: Sequelize.INTEGER,

        references: {
          model: {
            tableName: 'users',
            schema: 'public'
          },
        key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game1s');
  }
};