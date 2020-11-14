const express = require('express');
var router = express.Router();
const axois = require('axios');


const url = 'https://trefle.io/api/v1/plants?token=' + `${token}`;

/* GET home page. */
router.get('/', function (req, res) {
  res.render('homepage');
  res.end();
});

//API main fetch (only first page (30 results returned))
router.get('/searchResults', async (req, res) => {

  let dataRes = [];
  const query = await axois.get(url)
    .then(resp => console.log(resp.data.length))
    .catch(err => console.error(err));


  res.end();
});

module.exports = router;