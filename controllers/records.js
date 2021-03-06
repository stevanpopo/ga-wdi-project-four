const Record = require('../models/record');
const User = require('../models/user');

function createRoute(req, res, next){
  Record.create(req.body)
    .then(record => res.json(record))
    .catch(next);
}

function showRoute(req, res, next){
  Record.findById(req.params.id)
    .then(record => res.json(record))
    .catch(next);
}

function indexRoute(req, res, next){
  // console.log(req.headers.recordsowneris);  user: req.headers.recordsowneris 
  Record.find({})
    .then(records => {
      console.log('records', records);
      res.json(records);
    })
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
  update: updateRoute,
  show: showRoute,
  index: indexRoute
};
