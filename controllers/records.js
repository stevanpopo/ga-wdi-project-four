const Record = require('../models/record');

function createRoute(req, res, next){
  Record.create(req.body)
    .then(record => res.json(record))
    .catch(next);
}

module.exports = {
  create: createRoute
};
