/* eslint-env node */

const express = require('express');
const router = express.Router();

const peopleController = require('./controllers/people');

router.post('/people/update', peopleController.update);

module.exports = router;
