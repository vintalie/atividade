'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasOne(models.City, {
        foreignKey:'id'
      })
      Address.hasMany(models.Client,{
        foreignKey:'endereco'
      })
      Address.hasMany(models.Clinic,{
        foreignKey:'endereco'
      })
      Address.hasMany(models.Emergency,{
        foreignKey:'localizacao'
      })
    }
  }
  Address.init({
    nm_endereco: DataTypes.STRING,
    id_bairro: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};