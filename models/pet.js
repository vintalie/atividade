'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.Client,{
        foreignKey:'id_cliente'
      })
      Pet.hasMany(models.Emergency, {
        foreignKey:'id_pet'
      })
    }
  }
  Pet.init({
    nm_pet: DataTypes.STRING,
    id_cliente: DataTypes.INTEGER,
    dt_nascimento: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};