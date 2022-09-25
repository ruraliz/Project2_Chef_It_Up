'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeUri: {
        type: Sequelize.STRING
      },
      dishName: {
        type: Sequelize.STRING
      },
      recipeTime: {
        type: Sequelize.INTEGER
      },
      recipeCalories: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING(2000)
      },
      ingredients: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      dietLabels: {
        type: Sequelize.STRING
      },
      totalNutrients: {
        type: Sequelize.STRING
      },
      mealType: {
        type: Sequelize.STRING
      },
      cuisine: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};