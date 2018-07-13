const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  blood: { type: Number, required: true },
  glucose: { type: Number, required: true },
  weight: { type: Number, required: true }
},{
  timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);
