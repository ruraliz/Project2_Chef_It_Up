const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const recipe = require('../models/recipe');




// router.get('/', async (req,res) => {
//     let recipes = await db.recipe.findAll();
//     // recipes= recipe.map( r => r.toJSON())
//     res.render('/profile', {recipes: recipes})
// })


// // get one recipe at time 
// router.get('/:id', async (req, res) => {
//     let recipe = await db.recipe.findOne ({
//         where: {id:req.params.id}
//     })
//     recipe = recipe.toJSON();
//     console.log(recipe);
//     res.render('/show', {recipes: recipes})
//     })

router.post('/', (req, res) => {
    const seedDate = new Date().toISOString();
    const newRecipe = db.recipe.create({
        recipeUri:req.body.uri,
        dishName: req.body.label,
        recipeTime: req.body.totalTime,
        recipeCalories: req.body.calories,
        userId: req.body.userId,
        createdAt: seedDate,
        updatedAt: seedDate
    })
    .then( (recipes) => {
        res.redirect('/profile')
        console.log(newRecipe) 
    })
    .catch(function (error) {
       res.status(404).render('404') 
    console.error(error);
}); 
console.log(newRecipe)  
})


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