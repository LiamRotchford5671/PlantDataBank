const express = require('express');
const app = express();
const router = express.Router();
const axois = require('axios');
const url = require('url');

const token = process.env.API_TOKEN;
const urlAPI = 'https://trefle.io/api/v1/';

app.use(express.static('public'))

/* GET home page. */
router.get('/', function (req, res) {
  res.render('homepage');
  res.end();
});

//API Search Bar results page
//TODO: API gathers 30 results at a time, so results page will need to have a next button to call the next page of data
router.get('/results', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let determine = Object.keys(queryObject);
  let searchStr = Object.values(queryObject);;

  if (determine == 'genus') {
    const query = await axois.get(urlAPI + 'genus/' + searchStr + '/plants?token=' + token + '&genus=' + searchStr)
      .then(resp => console.log(resp.data))
      .catch(err => console.error(err));
  } else {
    const query = await axois.get(urlAPI + 'plants/search?token=' + token + '&q=' + searchStr)
      .then(resp => console.log(resp.data))
      .catch(err => console.error(err));
  }

  res.end();
});


module.exports = router;