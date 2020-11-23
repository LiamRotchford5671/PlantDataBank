const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
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

/* GET Results Page */
/* Handles SearchBar, and Genus Category Search Results */
router.get('/results', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);;

  if (determine == 'genus') {
    let genusObj = await axios.get(urlAPI + 'genus/' + searchStr + '/plants?token=' + token + '&genus=' + searchStr)
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: genusObj.data.data
    });
  } else {
    let searchObj = await axios.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr)
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: searchObj.data.data
    });
  }

  res.end();
});

/* GET PlantInformation Page */
/* Handles Suggestion Cards and Results Page Plant options */
router.get('/plantInformation', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let plantStr = Object.values(queryObject);

  let plantObj = await axios.get(urlAPI + 'plants/' + plantStr + '?token=' + token)
    .then(resp => console.log(resp.data))
    .catch(err => console.error(err));

  res.render('plantInformation', {
    data: plantObj.data.data
  });

  res.end();
});

module.exports = router;