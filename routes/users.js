var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/about', function(req,res){
  res.send('respond with a resource(about)');
})

router.get('/singleResult', function(req,res){
  res.send('respond with a resource(singleResult)');
})

module.exports = router;
