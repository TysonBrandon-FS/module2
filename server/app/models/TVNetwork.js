const mongoose = require('mongoose');

const tvNetworkSchema = new mongoose.Schema({
  networkName: {
    type: String,
    required: [true, 'Network name is required'],
    unique: true,
    trim: true
  },
  headquarters: {
    type: String,
    required: [true, 'Headquarters location is required']
  },
  establishedYear: {
    type: Number,
    required: [true, 'Established year is required'],
    min: [1900, 'Year must be 1900 or later']
  },
  channelNumber: {
    type: Number,
    default: 0,
    min: [0, 'Channel cannot be negative']
  },
  shows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TVShow',
  }]
});

module.exports = mongoose.model('TVNetwork', tvNetworkSchema);
