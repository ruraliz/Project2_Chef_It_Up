const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:uri', (req, res) => {
    const options = {
        // url: "https://edamam-recipe-search.p.rapidapi.com/search",
       params: {i: req.params.uri,
      'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
      };

      axios.get("https://edamam-recipe-search.p.rapidapi.com/search", options).then(function (response) {
        console.log(response.data.hits);
      if (response.status === 200) {
          res.render('details', {recipes: response.data.hits});
          console.log(recipes)
      } else {
          res.status(404).render('404');
      }
    }).catch(function (error) {
        console.error(error);
    }).finally(() => {
      console.log('finished our axios request to OMDB');
    });
    });

module.exports = router;