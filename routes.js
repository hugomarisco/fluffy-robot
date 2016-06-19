/* eslint-env node */

const express = require('express');
const router = express.Router();

const peopleController = require('./controllers/people');

router.get('/', peopleController.list);
router.post('/people/update', peopleController.update);
router.post('/people/delete', peopleController.delete);
router.post('/people/create', peopleController.create);

module.exports = router;
