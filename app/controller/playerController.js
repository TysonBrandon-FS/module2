const FootballPlayer = require('../models/FootballPlayer.js');

const getAllPlayers = async (req, res) => {
  try {
    const players = await FootballPlayer.find().populate('team');
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await FootballPlayer.findById(req.params.id).populate('team');
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    const player = new FootballPlayer(req.body);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await FootballPlayer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlayer) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const deletedPlayer = await FootballPlayer.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json({ message: 'Player deleted successfully' });
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
