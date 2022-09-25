'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.recipe.belongsTo(models.user)
      models.recipe.hasMany(models.comment)
      // define association here
    }
  }
  recipe.init({
    recipeUri: DataTypes.STRING,
    dishName: DataTypes.STRING,
    recipeTime: DataTypes.INTEGER,
    recipeCalories: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    img: DataTypes.STRING(2000),
    ingredients: DataTypes.STRING,
    url: DataTypes.STRING,
    dietLabels: DataTypes.STRING,
    totalNutrients: DataTypes.STRING,
    mealType: DataTypes.STRING,
    cuisine: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};