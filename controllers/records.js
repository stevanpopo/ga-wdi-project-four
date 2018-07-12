const Record = require('../models/record');

function createRoute(req, res, next){
  Record.create(req.body)
    .then(record => res.json(record))
    .catch(next);
}

function updateRoute(req, res, next){
  Record.findById(req.params.id)
    .then(record => record.set(req.body))
    .then(record => record.save())
    .then(record => res.json(record))
    .catch(next);
}

module.exports = {
  create: createRoute,
  update: updateRoute
};
