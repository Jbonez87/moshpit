const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  genre: String,
  saleDate: String,
  info: String,
  venueId: String,
});

module.exports = mongoose.model('Event', eventSchema);
