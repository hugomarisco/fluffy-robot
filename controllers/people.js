/* eslint-env node */

const Datastore = require('../datastore');

const storage = new Datastore('dev');

module.exports = {
  list: (req, res) => {
    res.render('index', { people: storage.all() });
  },

  update: (req, res) => {
    const person = req.body;

    storage.put(person.index, person);

    res.redirect('/');
  },

  delete: (req, res) => {
    const person = req.body;

    storage.remove(person.index);

    res.redirect('/');
  },

  create: (req, res) => {
    storage.append(req.body);

    res.redirect('/');
  },
};
