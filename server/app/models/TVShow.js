const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  showName: {
    type: String,
    required: [true, 'Show name is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: ['Drama', 'Comedy', 'Action', 'Sci-Fi', 'Reality', 'Documentary'],
      message: '{VALUE} is not a valid genre'
    }
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1900, 'Year must be 1900 or later']
  },
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required']
  },
  network: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TVNetwork',
  }
});

module.exports = mongoose.model('TVShow', tvShowSchema);
