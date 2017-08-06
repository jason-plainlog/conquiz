var express = require('express');
var crypto = require('crypto');
var User = require('../models/user.js');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if(req.body['username'] == '' || req.body['password'] == '')
    res.render('index', { title: 'Conquiz', error: "Username / Password can't be blank!", username: req.body['username']});
  else if(req.body['submit'] == 'signup'){
    var newUser = new User({
      username: req.body['username'].toLowerCase(),
      password: crypto.createHash('md5').update(req.body['password']).digest('hex')
    });
    newUser.exist(newUser, function(user, result){
      if(result == 1)
        res.render('index', { title: 'Conquiz', error: newUser.username + ' had been used!', username: newUser.username});
      else{
        user.save();
        res.render('index', { title: 'Conquiz', error: 'Success!' });
      }
    });
  }else{
    console.log(req.body['username']);
    console.log(req.body['password']);
    console.log(req.body['submit']);
    res.render('index', { title: 'Conquiz'});
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conquiz'});
});

module.exports = router;
