const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  note: { type: String }
});

module.exports = mongoose.model('Treatment', treatmentSchema);
