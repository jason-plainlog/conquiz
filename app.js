var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use(function(req, res, next) {
  res.status(404).send('404 Not Found.');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

module.exports = app;
