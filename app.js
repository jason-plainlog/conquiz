var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var settings = require('./routes/settings');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1)
app.use(session({
  secret: 'Conquiz 1024',
  resave: true,
  saveUninitialized: true,
}))

app.use('/', index)
app.use('/settings', settings);;

app.use(function(req, res, next) {
  res.status(404).send('404 Not Found.');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

module.exports = app;
