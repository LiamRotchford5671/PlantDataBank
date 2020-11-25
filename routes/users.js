var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/about', function(req,res){
  res.send('respond with a resource(about)');
})

router.get('/reference', function(req,res){
  res.send('respond with a resource(reference)');
})

module.exports = router;
