const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(),
  PNF = require('google-libphonenumber').PhoneNumberFormat;

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is a required field.' },
  email: { type: String, required: 'Email is a required field.' },
  password: { type: String, required: 'Password is a required field.' },
  image: { type: String },
  lovedOnes: [ { type: String } ],
  telephone: { type: String },
  patient: { type: Boolean, default: false }
}, {
  id: false
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json){
    delete json.password;
    return json;
  }
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function checkTelephoneFormat(next) {
  if(this.isModified('telephone')) {
    this.telephone = phoneUtil.format(phoneUtil.parse(this.telephone, 'GB'), PNF.E164);
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
