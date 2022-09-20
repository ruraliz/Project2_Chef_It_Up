'use strict';

const axios= require('axios')
const Sequelize = require ('sequelize')


module.exports = {
async up (queryInterface, Sequelize) {
  const seedDate = new Date().toISOString();

  const fetchRecipesConfig = {
    method: 'GET',
  url: "https://edamam-recipe-search.p.rapidapi.com/search",
  params:{q:'chicken'},
  headers: {
    'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
  }
};

const recipesToUpload= [];

const recipesResponse = await axios.request(fetchRecipesConfig);

if(recipesResponse.status === 200 && recipesResponse?.data) {

// const promiseArray = [];

// recipesResponse.data.forEach(recipe => {
//   const recipeDetailsConfig = {
//   method: 'GET',
//   url: "https://edamam-recipe-search.p.rapidapi.com/search",
//   params: {recipeUri: recipe.hits[0].recipe.uri}, ..search?recipeUr
//   headers: {
//     'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
//     'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
//   }
// }
// promiseArray.push(axios.request(recipeDetailsConfig));
// });

// const recipeResponses = await Promise.all(promiseArray);
// console.log(recipeResponses)

// if(Array.isArray(recipeResponses) && 
// recipeResponses.length) { 

  recipesResponse.data.hits.forEach(recipeRes => {
    // if(recipeRes.status === 200 && recipeRes.data.hits) {
      recipesToUpload.push({
        recipeUri: recipeRes.recipe.uri,
        dishName: recipeRes.recipe.label,
        recipeTime: recipeRes.recipe.totalTime,
        recipeCalories: recipeRes.recipe.calories,
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
// } else {
// console.log('Failing in fetching all recipes');
// }
},

   

  async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('recipes', null, {});
  
  }
};

