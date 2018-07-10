const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Treatment', treatmentSchema);
