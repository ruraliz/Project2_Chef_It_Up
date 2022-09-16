const axios = require("axios");

const options = {
  method: 'GET',
  /*url: "https://edamam-recipe-search.p.rapidapi.com/search",*/
  params: {q: 'chicken'},
  headers: {
    'X-RapidAPI-Key': '51e0b560ccmsh8d009f47562199fp1335f6jsn0ba290dccd71',
    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
  }
};

axios.get("https://edamam-recipe-search.p.rapidapi.com/search",options).then(function (response) {
	console.log(response.data.hits[0]);
}).catch(function (error) {
	console.error(error);
});