const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const recipe = require('../models/recipe');




router.get('/', async (req,res) => {
    let recipes = await db.recipe.findAll();
    recipes= recipes.map( r => r.toJSON())
    res.render('recipes/index', {recipes: recipes})
})

router.get('/search', async (req,res) => {
    res.render('recipes/search')
})


router.get('/:id', async (req, res) => {
    let recipe = await db.recipe.findOne ({
        where: {id:req.params.id},
        include:[db.comment]
    })
    recipe = recipe.toJSON();
    console.log(recipe);
    res.render('recipes/show', {recipe: recipe, comments: recipe.comments})
    })

router.post('/new', async (req, res) => {
    console.log(req.body)
    const seedDate = new Date().toISOString();
    const newRecipe = await db.recipe.create({
        recipeUri:req.body.recipeUri,
        dishName:req.body.dishName,
        recipeTime: parseInt(req.body.recipeTime),
        recipeCalories: parseInt(req.body.recipeCalories),
        userId: parseInt(req.body.userId),
        img:req.body.img,
        url: req.body.url,
        ingredients: req.body.listIngredients,
        totalNutrients: req.body.totalNutrients,
        dietLabels: req.body.dietLabels,
        mealType: req.body.mealType,
        cuisine: req.body.cuisine,
        createdAt: seedDate,
        updatedAt: seedDate
    })
    .then( (recipes) => {
        res.redirect('/recipes')
    })
    .catch(function (error) {
       res.status(404).render('404') 
    console.error(error);  
})
})

router.post('/:id/comments', async (req, res) => {
    const createdDate = new Date().toISOString();
    await db.recipe.findOne({
      where: { id: req.params.id }
    })
    .then((recipe) => {
      if (!recipe) throw Error()
        db.comment.create({
        recipeId: parseInt(req.params.id),
        userId: parseInt(req.params.id),
        name: req.body.name,
        content: req.body.content,
        createdAt: createdDate,
        updatedAt: createdDate
      }).then(comment => {
        res.redirect(`/recipes/${req.params.id}`);
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
  

router.post('/results', (req, res) => {
    console.log(req.body)
    const searchTerm= req.body.q
    const options = {
        method: 'GET',
        url: "https://edamam-recipe-search.p.rapidapi.com/search",
        params: {q: searchTerm},
        headers: {
          'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
      };
      axios.get("https://edamam-recipe-search.p.rapidapi.com/search",options).then(function (response) {
          console.log(response.data.hits);
        if (response.status === 200 && response.data.hits && response.data.hits.length) {
            res.status(200).render('recipes/results', {recipes: response.data.hits});
        } else {
            res.status(404).render('404');
        }
      }).catch(function (error) {
          console.error(error);
      });
      });

      router.delete('/:id', async (req, res) => {
        console.log('delete recipe')
    
        let recipesDeleted = await db.recipe.destroy({
            where: { id: req.params.id }
        });
        console.log('==== this is the delete route ======');
        console.log('Amount of recipes deleted', recipesDeleted);
        res.redirect('/recipes');
    });
    


module.exports = router;