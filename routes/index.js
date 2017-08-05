var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body['email']);
  console.log(req.body['password']);
  console.log(req.body['value']);
  res.send('success');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conquiz' });
});

module.exports = router;
