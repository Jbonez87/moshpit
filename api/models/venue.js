const mongoose = require('mongoose');

const { Schema } = mongoose;

const venueSchema = new Schema({
  name: String,
  location: String,
  zipCode: Number,
  timezone: String,
});

module.exports = mongoose.model('Venue', venueSchema);
