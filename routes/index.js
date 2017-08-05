var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if(req.body['submit'] == 'signup'){
    var newUser = new User({
      email: req.body['email'],
      password: req.body['password']
    });
    newUser.save();
  }else{
    console.log(req.body['email']);
    console.log(req.body['password']);
    console.log(req.body['submit']);
  }
  res.render('index', { title: 'Conquiz' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conquiz' });
});

module.exports = router;
