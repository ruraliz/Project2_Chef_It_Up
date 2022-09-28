'use strict';

const axios= require('axios');
const recipe = require('../models/recipe');


module.exports = {
async up (queryInterface, Sequelize) {
  const seedDate = new Date().toISOString();

  const fetchRecipesConfig = {
  method: 'GET',
  url: "https://edamam-recipe-search.p.rapidapi.com/search",
  params: {q: 'chicken'},
  headers: {
  'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
  'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
  }
};
const recipeRes = await axios.request(fetchRecipesConfig);
const recipesToUpload= [];
if(recipeRes.status === 200 && recipeRes?.data.hits) {
  recipeRes.data.hits.forEach(recipes => {
    console.log(recipes)
    // if(recipeRes.status === 200 && recipeRes.data.hits) {
      recipesToUpload.push({
        recipeUri: recipes.recipe.uri,
        dishName: recipes.recipe.label,
        recipeTime: recipes.recipe.totalTime,
        recipeCalories: recipes.recipe.calories,
        img: recipes.recipe.image,
        ingredients: recipes.recipe.listIngredients,
        url: recipes.recipe.url,
        dietLabels: recipes.recipe.dietLabels[0],
        mealType: recipes.recipe.mealType,
        cuisine: recipes.recipe.cuisineType,
        createdAt: seedDate,
        updatedAt: seedDate
      })
    // }
  });
console.log(recipesToUpload)
  await queryInterface.bulkInsert('recipes', recipesToUpload, {})
} else {
  console.log('Failed to fetch individual recipe data');
}
},

  async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('recipes', null, {});
  
  }
};

