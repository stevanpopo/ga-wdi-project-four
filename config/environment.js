const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI ||  'mongodb://localhost:27017/yourcare';
const secret = 'nsh72=<!shiw';
const twilioKey = process.env.TWILIO_AUTH_KEY;
const twilioSid = process.env.TWILIO_SID;

module.exports = { port, dbURI, secret, twilioKey, twilioSid };
