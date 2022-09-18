'use strict';

const axios = require('axios');

module.exports = {
  async up (queryInterface, Sequelize) {
    const seedDate = new Date().toISOString();

    const fetchRecipesConfig = {
      method: 'GET',
    url: "https://edamam-recipe-search.p.rapidapi.com/search",
    headers: {
      'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };

const recipesToUpload= [];

const recipesResponse = await axios.request(fetchRecipesConfig);

if(recipesResponse.status === 200 && recipesResponse?.data) {
  const promiseArray = [];
  recipesResponse.data.forEach(recipe => {
    const recipeDetailsConfig = {
      method: 'GET',
    url: "https://edamam-recipe-search.p.rapidapi.com/search",
    params: {recipeUri: recipe.recipeUri},
    headers: {
      'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  }
  promiseArray.push(axios.request(recipeDetailsConfig));
  });
  const recipeResponses = await Promise.all(promiseArray);
  console.log(recipeResponses)
  if(Array.isArray(recipeResponses) && 
  recipeResponses.length) {
    recipeResponses.forEach(recipeRes => {
      if(recipeRes.status === 200 && recipeRes.data) {
        recipesToUpload.push({
          recipeUri: recipeRes.data[0].recipe.uri,
          dishName: recipeRes.data[0].recipe.label,
          recipeTime: recipeRes.data[0].recipe.totalTime,
          recipeCalories: recipeRes.data[0].recipe.calories,
          createdAt: seedDate,
          updatedAt: seedDate
        })
      }
    });
    await queryInterface.bulkInsert('recipes', recipesToUpload, {})
  } else {
    console.log('Failed to fetch individual recipe data');
  }
} else {
  console.log('Failing in fetching all recipes');
  }
 },

async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('recipes', null, {});
  
  }
};
