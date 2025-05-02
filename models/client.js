'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.hasOne(models.User, {
        foreignKey:"id"
      })
      Client.hasOne(models.Address, {
        foreignKey:"id"
      })
      Client.hasMany(models.Pet)
    }
  }
  Client.init({
    nome: DataTypes.STRING,
    endereco: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    cep: DataTypes.DECIMAL,
    id_usuario: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};