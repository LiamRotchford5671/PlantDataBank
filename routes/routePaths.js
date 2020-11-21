const express = require('express');
const app = express();
const router = express.Router();
const axois = require('axios');
const url = require('url');
const fs = require('fs');


const token = process.env.API_TOKEN;
const urlAPI = 'https://trefle.io/api/v1/';

app.use(express.static('public'))

/* GET Homepage Page */
/* Handles Suggestion Cards */
router.get('/', function (req, res) {
  let sgtdata = fs.readFileSync('./public/json/suggestionsData.json');
  let sgtObj = JSON.parse(sgtdata);

  res.render('homepage', {
    data: sgtObj
  });

  res.end();
});

router.get('/about', function(req,res){
  res.render('about');
  res.end();
});

router.get('/singleResult', function(req,res){
  res.render('singleResult');
  res.end();
});

/* GET Results Page */
/* Handles SearchBar, and Genus Category Search Results */
router.get('/results', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);;

  if (determine == 'genus') {
    let genusObj = await axois.get(urlAPI + 'genus/' + searchStr + '/plants?token=' + token + '&genus=' + searchStr)
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: genusObj
    });
  } else {
    let searchObj = await axois.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr)
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: searchObj
    });
  }

  res.end();
});

/* GET PlantInformation Page */
/* Handles Suggestion Cards and Results Page Plant options */
router.get('/plantInformation', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let plantStr = Object.values(queryObject);;

  let plantObj = await axois.get(urlAPI + 'plants/' + plantStr + '?token=' + token)
    .then(resp => console.log(resp.data))
    .catch(err => console.error(err));

  res.render('plantInformation', {
    data: plantObj
  });

  res.end();
});

module.exports = router;