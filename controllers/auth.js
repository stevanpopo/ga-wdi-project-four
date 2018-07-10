const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('module');

function register(req, res, next){
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function login(req, res, next){
  User.findOne(req.body.email)
    .then(user => {
      if(!user && !user.validatePassword(req.body.password)){
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id}, secret, { expiresIn: '6h' });

      res.json({
        user,
        token,
        message: `Welcome back ${user}`
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
