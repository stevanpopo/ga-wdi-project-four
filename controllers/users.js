const User = require('../models/user');

function showRoute(req, res, next){
  User.findById(req.params.id)
    .then(user => {
      // console.log('dealing with request');
      // console.log('currentUser', req.currentUser);
      if(!user.isUser(req.currentUser) && !user.isLovedOne(req.currentUser)) return res.status(401);
      // console.log('did I make it here?');
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next){
  User.findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function getDataRoute(req, res, next){
  User.findOne({ email: req.params.email })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute,
  getData: getDataRoute
};
