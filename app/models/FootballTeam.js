const mongoose = require('mongoose');

const footballTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
    unique: true,
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  establishedYear: {
    type: Number,
    required: [true, 'Established year is required'],
    min: [1800, 'Year must be 1800 or later']
  },
  championshipWins: {
    type: Number,
    default: 0,
    min: [0, 'Championship wins cannot be negative']
  }
});

module.exports = mongoose.model('FootballTeam', footballTeamSchema);
