'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasOne(models.User, {
        foreignKey:"id"
      })
      Clinic.hasMany(models.Emergency,{
        foreignKey:'id_clinica'
      })
      Clinic.belongsTo(models.Address, {
        foreignKey:'id'
      })
    }
  }
  Clinic.init({
    nome: DataTypes.STRING,
    endereco: DataTypes.INTEGER,
    cep: DataTypes.DECIMAL,
    cnpj: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};