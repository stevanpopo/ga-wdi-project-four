const User = require('../models/user');

function showRoute(req, res, next){
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  show: showRoute
};
