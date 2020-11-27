const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const axios = require('axios');
const url = require('url');
const fs = require('fs');


const token = process.env.API_TOKEN;
const urlAPI = 'https://trefle.io/api/v1/';

app.use(express.static(path.join(__dirname, 'public')));

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

/* GET Reference Page */
router.get('/reference', function (req, res) {
  res.render('referencePage');
  res.end();
});

/* GET About Page */
router.get('/about', function (req, res) {
  res.render('about');
  res.end();
});

/* GET SearchResults Page */
/* Handles SearchBar Results */
router.get('/searchResults', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);

  if (determine[0] == 'search') {
    let searchObj = await axios.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr[0])
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    let destruct1 = searchObj.data.links.last.split('?');
    let destruct2 = destruct1[1].split('&');
    let lastPage = destruct2[0].split('=');

    res.render('searchResults', {
      results: searchObj.data.data,
      count: 1,
      lastPg: lastPage[1]
    });

  } else if (determine[0] == 'nextSearchPage') { //Api returns 20 results at a time, this handles getting thet next set of results
    const queryObject = url.parse(req.url, true).query;
    let searchStr = Object.values(queryObject);

    let check = await axios.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr[0])
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    let destruct1 = check.data.links.last.split('?');
    let destruct2 = destruct1[1].split('&');
    let lastPage = destruct2[0].split('=');

    let nextResults = await axios.get(urlAPI + '/plants/search?token=' + token + '&q=' + searchStr[0] + '&page=' + searchStr[1])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));

    res.render('searchResults', {
      results: nextResults.data.data,
      count: searchStr[1],
      lastPg: lastPage[1]
    });

  } else {
    res.render('error');
  }
})

/* GET GenusResults Page */
/* Handles Genus Category Results */
router.get('/genusResults', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);

  if (determine[0] == 'genus') {
    let genusObj = await axios.get(urlAPI + 'genus/' + searchStr[0] + '/plants?token=' + token + '&genus=' + searchStr[0])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));
    let lastPage = genusObj.data.links.last.slice(-1);

    res.render('genusResults', {
      results: genusObj.data.data,
      count: 1,
      lastPg: lastPage
    });

  } else if (determine[0] == 'nextGenusPage') { //Api returns 20 results at a time, this handles getting thet next set of results
    const queryObject = url.parse(req.url, true).query;
    let searchStr = Object.values(queryObject);

    let check = await axios.get(urlAPI + 'genus/' + searchStr[0] + '/plants?token=' + token + '&genus=' + searchStr[0])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));
    let lastPage = check.data.links.last.slice(-1);

    let nextResults = await axios.get(urlAPI + '/plants?token=' + token + '&genus=' + searchStr[0] + '&page=' + searchStr[1])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));

    res.render('genusResults', {
      results: nextResults.data.data,
      count: searchStr[1],
      lastPg: lastPage
    });

  } else {
    res.render('error');
  }

  res.end();
});


/* GET PlantInformation Page */
/* Handles Suggestion Cards and Results Page Plant options */
router.get('/plantInformation', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let plantStr = Object.values(queryObject);

  let plantObj = await axios.get(urlAPI + 'plants/' + plantStr + '?token=' + token)
    // .then(resp => console.log(resp.data.data))
    .catch(err => console.error(err));

  res.render('plantInformation', {
    data: plantObj.data.data
  });

  res.end();
});

module.exports = router;