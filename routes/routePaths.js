const express = require('express');
const app = express();
const router = express.Router();
const axois = require('axios');
const url = require('url');



const urlSearch = 'https://trefle.io/api/v1/plants/search?token=' + `${token}`;

app.use(express.static('public'))

/* GET home page. */
router.get('/', function (req, res) {
  res.render('homepage');
  res.end();
});

//API main fetch (only first page (30 results returned))
router.get('/results', async (req, res) => {

  const queryObject = url.parse(req.url, true).query;
  let searchStr = Object.values(queryObject);

  const query = await axois.get(urlSearch + '&q=' + searchStr)
    .then(resp => console.log(resp.data))
    .catch(err => console.error(err));

  res.end();
});


module.exports = router;