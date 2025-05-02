'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emergencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        allowNull:false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull:false,
        type: Sequelize.STRING
      },
      localizacao: {
        references: {model:'Addresses',key:'id'},
        type: Sequelize.INTEGER
      },
      id_pet: {
        references: {model:'Pets',key:'id'},
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_clinica: {
        references: {model:'Pets',key:'id'},
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
    await queryInterface.dropTable('Emergencies');
  }
};