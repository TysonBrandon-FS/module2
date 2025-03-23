const FootballPlayer = require('../models/FootballPlayer.js');
const FootballTeam = require('../models/FootballTeam.js');
const messages = require('../utils/messages.js');

const getAllPlayers = async (req, res) => {
  try {
    const players = await FootballPlayer.find()
      .select('playerName position age isStarter team')
      .populate('team', 'name city');
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await FootballPlayer.findById(req.params.id)
      .select('playerName position age isStarter team')
      .populate('team', 'name city');
    if (!player) {
      return res.status(404).json({ error: messages.PLAYER_NOT_FOUND });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    const team = await FootballTeam.findById(req.body.team);
    if (!team) {
      return res.status(400).json({ error: messages.TEAM_NOT_FOUND });
    }

    const player = new FootballPlayer(req.body);
    const savedPlayer = await player.save();

    team.players.push(savedPlayer._id);
    await team.save();

    const populatedPlayer = await FootballPlayer.findById(savedPlayer._id)
      .select('playerName position age isStarter team')
      .populate('team', 'name city');
    
    res.status(201).json(populatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const existingPlayer = await FootballPlayer.findById(req.params.id);
    if (!existingPlayer) {
      return res.status(404).json({ error: messages.PLAYER_NOT_FOUND });
    }

    if (req.body.team) {
      const team = await FootballTeam.findById(req.body.team);
      if (!team) {
        return res.status(400).json({ error: messages.TEAM_NOT_FOUND });
      }
    }

    const updatedPlayer = await FootballPlayer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .select('playerName position age isStarter team')
    .populate('team', 'name city');

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const player = await FootballPlayer.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: messages.PLAYER_NOT_FOUND });
    }

    if (player.team) {
      await FootballTeam.findByIdAndUpdate(
        player.team,
        { $pull: { players: player._id } }
      );
    }

    await player.deleteOne();
    res.status(200).json({ message: messages.PLAYER_DELETED });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
}; 