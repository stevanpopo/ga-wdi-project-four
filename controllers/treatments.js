const Treatment = require('../models/treatment');
const _ = require('lodash');
// const twilio = require('../lib/twilio');

function indexRoute(req, res, next){
  Treatment.find({ owner: req.currentUser._id}) // filter out past dates on not users, dateTime: { $gte: Date.now()}
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
    // .then(treatment => Treatment.populate(treatment, { path: 'owner'}))
    .then(treatment => {
      // twilio.sendSMS('new appointment scheduled', treatment.owner.telephone);
      res.status(201).json(treatment);
    })
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

function completeIndexRoute(req, res, next){
  Treatment.find()
    .populate('owner')
    .then(treatments => res.json(treatments))
    .catch(next);
}

function updateIndexRoute(req, res, next){
  Treatment.findById(req.body.id)
    .then(treatment => treatment.set(req.body))
    .then(treatment => treatment.save())
    .then(treatment => res.json(treatment))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  completeIndex: completeIndexRoute,
  updateIndex: updateIndexRoute
};
