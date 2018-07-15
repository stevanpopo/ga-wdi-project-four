const { twilioKey, twilioSid } = require('../config/environment');
const client = require('twilio')(twilioSid, twilioKey);

function sendSMS(body, tel) {
  return client.messages
    .create({
      body,
      from: '+441355377145',
      to: tel
    });
}

module.exports = { sendSMS };
