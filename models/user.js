'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasOne(models.Client, {
          as:'cliente',
          foreignKey:'id_usuario'
        })
        User.hasOne(models.Clinic, {
          as:'clinica',
          foreignKey:'id_usuario'
        })
    }
  }
  User.init({
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    celular: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};