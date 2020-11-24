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
  let searchStr = Object.values(queryObject);

  if (determine[0] == 'genus') {
    let genusObj = await axios.get(urlAPI + 'genus/' + searchStr[0] + '/plants?token=' + token + '&genus=' + searchStr[0])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: {
        results: genusObj.data.data,
        count: 1
      }
    });
  } else if (determine[0] == 'nextGenusPage') {
    const queryObject = url.parse(req.url, true).query;
    let searchStr = Object.values(queryObject);

    //console.log(determine);
    //console.log(searchStr);

    let check = await axios.get(urlAPI + 'genus/' + searchStr[0] + '/plants?token=' + token + '&genus=' + searchStr[0])
      //.then(resp => console.log(resp.data.data))
      .catch(err => console.error(err));

    if (searchStr[1] <= check.data.links.last.slice(-1)) {
      let nextResults = await axios.get(urlAPI + '/plants?token=' + token + '&genus=' + searchStr[0] + '&page=' + searchStr[1])
        //.then(resp => console.log(resp.data.data))
        .catch(err => console.error(err));

      res.render('results', {
        data: {
          results: nextResults.data.data,
          count: searchStr[1]
        }
      });
    } else {
      res.render('results', {
        data: {
          results: false,
          count: 1
        }
      });
    }

  } else {
    let searchObj = await axios.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr[0])
      //.then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: {
        results: searchObj.data.data,
        count: 1
      }
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
    //.then(resp => console.log(resp.data))
    .catch(err => console.error(err));

  res.render('plantInformation', {
    data: plantObj.data.data
  });

  res.end();
});

module.exports = router;