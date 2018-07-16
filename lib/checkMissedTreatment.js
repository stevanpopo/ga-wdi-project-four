const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const twilio = require('./twilio');
const Treatment = require('../models/treatment');
require('../models/user');

mongoose.connect(dbURI);

Treatment.find()
  .populate('owner')
  .then(treatments => {
    treatments.forEach(treatment => {
      if(treatment.dateTime > Date.now() && !treatment.completed){
        twilio.sendSMS('you missed an appointment', treatment.owner.telephone);
      }
    });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

// module.exports = {checkMissedTreatment};
