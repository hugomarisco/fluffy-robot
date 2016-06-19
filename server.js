/* eslint-env node */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = {
    status: 404,
    error_messages: ['Invalid endpoint'],
  };

  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status).send({ error_messages: err.error_messages });
});

module.exports = app;
