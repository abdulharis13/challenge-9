'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_bios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_foreign: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: {
            tableName: 'users',
            schema: 'public'
          },
        key: 'id'
        }
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      socialMedia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aboutMe: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('user_bios');
  }
};