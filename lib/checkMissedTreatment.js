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
      // check treatments from last 24 hours, if they haven't been done and are due, send SMS reminder
      if(treatment.dateTime > moment(Date.now()).subtract(1, 'days').toDate()  && treatment.dateTime < Date.now() && !treatment.completed){
        console.log(treatment.title, treatment.dateTime);
        twilio.sendSMS(`Hello ${treatment.owner.username} - Your treatment ${treatment.title} was due at ${treatment.dateTime}, but you have not marked it as complete. Please remember to do the treatment or mark it as complete if you already have.`, treatment.owner.telephone);
      }
    });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
