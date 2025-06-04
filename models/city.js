'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.State, {
        foreignKey:'id_estado',
        
      })
      City.hasMany(models.Address, {
        foreignKey:'id_cidade',
      })
    }
  }
  City.init({
    nm_cidade: DataTypes.STRING,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};