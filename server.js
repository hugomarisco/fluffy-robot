/* eslint-env node */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

const routes = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.render('error', { message: err.message, error: err });
});

module.exports = app;
