const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  dateTime: { type: Date, required: 'Date & Time is a required field.' },
  title: { type: String, required: 'Title is a required field.' },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String },
  notes: { type: String, required: 'Notes is a required field.' }
});

module.exports = mongoose.model('Treatment', treatmentSchema);
