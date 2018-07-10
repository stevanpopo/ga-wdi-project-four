const Treatment = require('../models/treatment');

function indexRoute(req, res, next){
  Treatment.find()
    .then(treatments => res.json(treatments))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
