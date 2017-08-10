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
  if(req.body['submit'] == 'update'){
    if(req.body['username'] == ''){
      res.render('settings', { error: 'You can\'t have no username!' });
      return;
    }
    var user = new User({ username: req.body['username'] });
    user.exist(user, function(user, result) {
      if(req.body['username'] != req.session.user.username && result){
        res.render('settings', { error: req.body['username'] + ' had been registed!' });
        return;
      }else{
        req.session.user.username = req.body['username'];
        if(req.body['password'] != '')
          req.session.user.password = crypto.createHash('md5').update(req.body['password']).digest('hex');
        req.session.user.email = req.body['email'];
        req.session.user.info = req.body['info'];
        var user = new User(req.session.user);
        user.update();
        res.render('settings', { success: 'Profile Updated!' });
      }
    });
  }

  if(req.body['submit'] == 'delete'){
    var user = new User({ id: req.session.user.id });
    user.remove();
    delete(res.locals.user);
    req.session.destroy();
    res.render('index', { success: 'Account Deleted!' });
  }
})



module.exports = router;
