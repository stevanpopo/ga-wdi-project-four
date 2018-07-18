const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const moment = require('moment');

const twilio = require('./twilio');
const Treatment = require('../models/treatment');
require('../models/user');

mongoose.connect(dbURI);

Treatment.find()
  .populate('owner')
  .then(treatments => {
    treatments.forEach(treatment => {
      // if a treatment hasnt been marked complete, adn is an hour overdue, notify family
      if(moment(treatment.dateTime).add(1, 'hours').toDate() < Date.now() && !treatment.completed){

        treatment.owner.lovedOnes.forEach(person => {
          twilio.sendSMS(`Hello ${person.username} - Your loved one ${treatment.owner.username} has left their treatment ${treatment.title} as incomplete even though it was due at ${treatment.dateTime}. Please check in with them and remind them of their treatment.`, treatment.owner.telephone);
        });
      }
    });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
