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
      // check treatments from now to 30 mins and send notification if required
      if(treatment.dateTime > Date.now() && moment(Date.now()).add(10, 'hours').toDate() && treatment.notifications){
        twilio.sendSMS(`Hello ${treatment.owner.username} - This is a reminder that your treatment ${treatment.title} is coming up at ${treatment.dateTime}.`, treatment.owner.telephone);
      }
    });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
