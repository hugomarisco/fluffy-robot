/* eslint-env node */

const Datastore = require('../datastore');

let storage = new Datastore('dev');

module.exports = {
  list: (req, res, next) => {
    res.render('index', { people: storage.all() });
  },

  update: (req, res, next) => {
    const people = req.body.people[0].firstname.map((firstname, index) => {
      return { firstname, surname: req.body.people[0].surname[index] };
    });

    people.forEach((person, index) => storage.put(index, person));

    res.redirect('/');
  },
};
