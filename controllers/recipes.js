const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const recipe = require('../models/recipe');




router.get('/', async (req,res) => {
    let recipes = await db.recipe.findAll();
    recipes= recipes.map( r => r.toJSON())
    res.render('profile', {recipes: recipes})
})

router.get('/search', async (req,res) => {
    res.render('search')
})

//get one recipe at time 
router.get('/:id', async (req, res) => {
    let recipe = await db.recipe.findOne ({
        where: {id:req.params.id}
    })
    recipe = recipe.toJSON();
    console.log(recipe);
    res.render('show', {recipe: recipe})
    })

router.post('/new', async (req, res) => {
    console.log(req.body)
    const seedDate = new Date().toISOString();
    const newRecipe = await db.recipe.create({
        recipeUri:req.body.uri,
        dishName: req.body.label,
        recipeTime: parseInt(req.body.recipeTime),
        recipeCalories: parseInt(req.body.recipeCalories),
        userId: parseInt(req.body.userId),
        img:req.body.img,
        url: req.body.url,
        ingredients: req.body.ingredients,
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
}); 
console.log(newRecipe)  
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
            res.status(200).render('results', {recipes: response.data.hits});
        } else {
            res.status(404).render('404');
        }
      }).catch(function (error) {
          console.error(error);
      });
      });




// router.post('/:id/comment', (req, res) => {
//     const createdDate = new Date().toISOString();
//     db.article.findOne({
//       where: { id: req.params.id }
//     })
//     .then((article) => {
//       if (!article) throw Error()
//       db.comment.create({
//         articleId: parseInt(req.params.id),
//         name: req.body.name,
//         content: req.body.content,
//         createdAt: createdDate,
//         updatedAt: createdDate
//       }).then(comment => {
//         res.redirect(`/articles/${req.params.id}`);
//       })
//     })
//     .catch((error) => {
//       console.log(error)
//       res.status(400).render('main/404')
//     })
//   })
  
// router.delete('/:idx', (req, res) => {
//     const birds = fs.readFileSync('./birds.json');
//     const birdData = JSON.parse(birds);
  
//     // remove the deleted dinosaur from the dinosaurs array
//     birdData.splice(req.params.idx, 1)
  
//     // save the new dinosaurs to the data.json file
//     fs.writeFileSync('./birds.json', JSON.stringify(birdData));
  
//     //redirect to the GET /dinosaurs route (index)
//     res.redirect('/birds');
//   });

module.exports = router;