'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.City)
    }
  }
  State.init({
    sg_estado: DataTypes.STRING,
    nm_estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};