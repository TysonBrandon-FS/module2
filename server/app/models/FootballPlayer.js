const mongoose = require('mongoose');

const footballPlayerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: {
      values: ['QB', 'O-Line', 'Defence', 'WR', 'RB', 'TE'],
      message: '{VALUE} is not a valid position'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18']
  },
  isStarter: {
    type: Boolean,
    required: [true, 'isStarter status is required']
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FootballTeam',
  }
});

module.exports = mongoose.model('FootballPlayer', footballPlayerSchema);
