const routes = require('express').Router();

const treatments = require('../controllers/treatments');
const auth = require('../controllers/auth');

routes.route('/treatments')
  .get(treatments.index)
  .post(treatments.create);

routes.route('/treatments/:id')
  .get(treatments.show)
  .put(treatments.update)
  .delete(treatments.delete);

routes.route('/register')
  .post(auth.register);

module.exports = routes;
