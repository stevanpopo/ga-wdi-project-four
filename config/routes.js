const routes = require('express').Router();

const treatments = require('../controllers/treatments');
const auth = require('../controllers/auth');
const records = require('../controllers/records');
const users = require('../controllers/users');

const secureRoute = require('../lib/secureRoute');

routes.route('/treatments')
  .get(treatments.index)
  .post(secureRoute, treatments.create);

routes.route('/treatments/:id')
  .get(treatments.show)
  .put(secureRoute, treatments.update)
  .delete(secureRoute, treatments.delete);

routes.route('/records')
  .post(records.create);

routes.route('/records/:id')
  .put(records.update);

routes.route('/register')
  .put(auth.register);

routes.route('/login')
  .post(auth.login);

routes.route('/profile/:id')
  .get(users.show)
  .put(users.update);

module.exports = routes;
