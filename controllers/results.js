const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const { seed } = require('@ngneat/falso');

/*router.get('/', (req, res) => {
    const searchTerm= req.query.q
    const config = {
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {s: searchTerm},
        headers: {
          'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
      };
      axios.get('https://edamam-recipe-search.p.rapidapi.com/search', config).then(function (response) {
        console.log('this is response', response);
        res.render('results', {recipes: response.data})
        console.log(response.data);
       /*if (response.status === 200 && response.data && response.data.length) {
            res.status(200).render('results', {recipes: response.data});
        } else {
            res.status(404).render('404');
        }
    }).catch((err) => {
        res.status(400).send(err);
    }).finally(() => {
        console.log('finished our axios request to OMDB');
    })
});*/

router.get('/', (req, res) => {
const searchTerm= req.query.q
const options = {
    method: 'GET',
    /*url: "https://edamam-recipe-search.p.rapidapi.com/search",*/
    params: {q: searchTerm},
    headers: {
      'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  axios.get("https://edamam-recipe-search.p.rapidapi.com/search",options).then(function (response) {
      console.log(response.data.hits);
    if (response.status === 200 && response.data.hits && response.data.hits.length) {
        res.status(200).render('results', {recipes: response.data.hits});
    } else {
        res.status(404).render('404');
    }
  }).catch(function (error) {
      console.error(error);
  });
  });

router.post('/recipes', (req, res) => {
    const seedDate = new Date().toISOString();
    db.recipe.create({
        recipeUri:req.body.uri,
        dishName: req.body.label,
        recipeTime: req.body.totalTime,
        recipeCalories: req.body.calories,
        createdAt: seedDate,
        updatedAt: seedDate
    })
    .then( (newrecipes) => {
        res.redirect('./newRecipe')
    })
    .catch(function (error) {
    console.error(error);
});   
})
module.exports = router;