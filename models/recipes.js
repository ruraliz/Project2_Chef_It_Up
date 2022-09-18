'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipes.init({
    dishName: DataTypes.STRING,
    recipeUri: DataTypes.STRING,
    recipeTime: DataTypes.INTEGER,
    recipeCalories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipes',
  });
  return recipes;
};