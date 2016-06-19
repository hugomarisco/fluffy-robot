/* eslint-env node */

const Datastore = require('../datastore');

const storage = new Datastore('dev');

module.exports = {
  list: (req, res) => {
    res.render('index', { people: storage.all() });
  },

  update: (req, res) => {
    const person = this._pickPerson(req.body);

    storage.put(person.index, person);

    res.redirect('/');
  },

  delete: (req, res) => {
    const person = this._pickPerson(req.body);

    storage.remove(person.index);

    res.redirect('/');
  },

  create: (req, res) => {
    const person = this._pickPerson(req.body);

    storage.append(person);

    res.redirect('/');
  },

  // Pseudo-private methods

  _pickPerson: (raw) => ({ index: raw.index, firstname: raw.firstname, surname: raw.surname }),
};
