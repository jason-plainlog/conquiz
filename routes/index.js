var crypto = require('crypto');
var express = require('express');
var User = require('../models/user.js');
var session = require('express-session');
var router = express.Router();

router.use(function(req, res, next) {
  if(req.session.user)
    res.locals.user = req.session.user;
  next();
})

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  var user = new User({
    username: req.body['username'].toLowerCase(),
    password: crypto.createHash('md5').update(req.body['password']).digest('hex'),
    authed: false
  });
  res.locals.user = user;

  if(user.username == '' || req.body['password'] == ''){
    res.render('index', { error: "Username / Password can't be blank!" });
    return ;
  }

  if(req.body['submit'] == 'signup'){
    user.exist(user, function(user, result){
      if(result){
        res.render('index', { error: user.username + ' had been used!' });
      }else{
        user.save();
        user.auth(user, function(match){
          user = new User(match);
          user.authed = true;
          req.session.user = user;
          res.locals.user = user;
          res.render('index', { success: 'Registed Successfully!' });
        });
      }
    });
  }

  if(req.body['submit'] == 'signin'){
    user.auth(user, function(match){
      if(match){
        user = new User(match);
        user.authed = true;
        req.session.user = user;
        res.locals.user = user;
        res.render('index', { success: "Signed in as " + user.username.toUpperCase() + " !" });
      }else{
        res.render('index', { error: 'Wrong Username / Password!' });
      }
    });
  }
});

module.exports = router;
