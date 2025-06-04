'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emergency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Emergency.hasOne(models.Address, {
        foreignKey: 'id'
      })
      Emergency.belongsTo(models.Clinic, {
        foreignKey:'id_clinica'
      })
      Emergency.hasOne(models.Pet, {
        foreignKey: 'id'
      })
    }
  }
  Emergency.init({
    titulo: DataTypes.STRING,
    sintomas: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    id_pet: DataTypes.INTEGER,
    id_clinica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Emergency',
  });
  return Emergency;
};