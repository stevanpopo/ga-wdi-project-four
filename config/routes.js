const routes = require('express').Router();

const treatments = require('../controllers/treatments');
const auth = require('../controllers/auth');
const records = require('../controllers/records');
const users = require('../controllers/users');

const secureRoute = require('../lib/secureRoute');

routes.route('/treatments')
  .get(secureRoute, treatments.index)
  .post(secureRoute, treatments.create)
  .put(secureRoute, treatments.updateIndex);

routes.route('/treatments/:id')
  .get(treatments.show)
  .put(secureRoute, treatments.update)
  .delete(secureRoute, treatments.delete);

routes.route('/alltreatments')
  .get(treatments.completeIndex);

routes.route('/records')
  .post(records.create)
  .get(secureRoute, records.index);

routes.route('/records/:id')
  .put(records.update)
  .get(records.show);

routes.route('/register')
  .post(auth.register);

routes.route('/login')
  .post(auth.login);

routes.route('/users/:id')
  .get(secureRoute, users.show)
  .put(users.update);

routes.route('/user/:email')
  .get(users.getData);

module.exports = routes;
