const User = require('../models/user');
const jwot = require('jsonwebtoken');
const { secret } = require('module');

function register(req, res, next){
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  register
};
