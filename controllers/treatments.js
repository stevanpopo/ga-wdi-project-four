const Treatment = require('../models/treatment');

function indexRoute(req, res, next){
  Treatment.find()
    .then(treatments => res.json(treatments))
    .catch(next);
}

function showRoute(req, res, next){
  Treatment.findById(req.params.id)
    .then(treatment => res.json(treatment))
    .catch(next);
}

function createRoute(req, res, next){
  Treatment.create(req.body)
    .then(treatment => res.status(201).json(treatment))
    .catch(next);
}

function updateRoute(req, res, next){
  Treatment.findById(req.params.id)
    .then(treatment => treatment.set(req.body))
    .then(treatment => treatment.save())
    .then(treatment => treatment.json())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute
};
