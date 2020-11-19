const express = require('express');
const app = express();
const router = express.Router();
const axois = require('axios');
const url = require('url');
const fs = require('fs');


const token = process.env.API_TOKEN;
const urlAPI = 'https://trefle.io/api/v1/';

app.use(express.static('public'))

/* GET home page. */
router.get('/', function (req, res) {
  let sgtdata = fs.readFileSync('./public/json/suggestionsData.json');
  let sgtObj = JSON.parse(sgtdata);

  res.render('homepage', {
    data: sgtObj
  });

  res.end();
});

//API Search Bar results page
router.get('/results', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);;

  if (determine == 'genus') {
    let genusObj = await axois.get(urlAPI + 'genus/' + searchStr + '/plants?token=' + token + '&genus=' + searchStr)
      .then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: genusObj
    });
  } else {
    let searchObj = await axois.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr)
      .then(resp => console.log(resp.data))
      .catch(err => console.error(err));

    res.render('results', {
      data: searchObj
    });
  }

  res.end();
});


module.exports = router;