var crypto = require('crypto');
var express = require('express');
var User = require('../models/user.js');
var session = require('express-session');
var router = express.Router();

router.use(function(req, res, next) {
  if(!req.session.user){
    res.redirect('/');
    return ;
  }
  res.locals.user = req.session.user;
  next();
})

router.get('/', function(req, res, next) {
  res.render('settings');
});

router.post('/', function(req, res, next) {
  var user = new User({ username: req.body['username'] });
  user.exist(user, function(result) {
    if(result){
      res.render('settings', { error: req.body['username'] + ' had been registed!' });
      return;
    }else{
      req.session.user.username = req.body['username'];
      if(req.body['password'] != '')
        res.session.user.password = crypto.createHash('md5').update(req.body['password']).digest('hex');
      req.session.user.email = req.body['email'];
      req.session.user.info = req.body['info'];
      var user = new User(req.session.user);
      user.update();
      res.render('settings', { success: 'Profile Updated!' });
    }
  });
})



module.exports = router;
