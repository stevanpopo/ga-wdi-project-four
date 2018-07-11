const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  dateTime: { type: Date },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Treatment', treatmentSchema);
