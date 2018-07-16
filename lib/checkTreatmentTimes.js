const twilio = require('./twilio');
const axios = require('axios');

axios({
  method: 'GET',
  url: '/api/alltreatments'
})
  .then(res => {
    const allTreatments = res.data;
    allTreatments.forEach(treatment => {
      if(treatment.dateTime > Date.now() && !treatment.completed) twilio.sendSMS('You missed apt X', treatment.owner.telephone);
    });
  });
console.log('check time');

module.exports = checkTime;
