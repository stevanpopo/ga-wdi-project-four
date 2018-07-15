const Treatment = require('../models/treatment');
const _ = require('lodash');

function indexRoute(req, res, next){
  Treatment.find({ owner: req.currentUser._id, dateTime: { $gte: Date.now()}}) // filter out past dates on not users
    .populate('owner')
    .then(treatments => {
      treatments = _.sortBy(treatments, ['dateTime']); // send in date order
      res.json(treatments);
    })
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
    .then(treatment => res.json(treatment))
    .catch(next);
}

function deleteRoute(req, res, next){
  Treatment.findById(req.params.id)
    .then(treatment => treatment.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
