'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      District.hasOne(models.State, {
        foreignKey:'id_estado'
      })
      District.hasMany(models.Address, {
        foreignKey:'id'
      })
    }
  }
  District.init({
    nm_bairro: DataTypes.STRING,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};