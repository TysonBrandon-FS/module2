const FootballTeam = require('../models/FootballTeam.js');
const FootballPlayer = require('../models/FootballPlayer.js');
const messages = require('../utils/messages.js');

const getAllTeams = async (req, res) => {
  try {
    const teams = await FootballTeam.find()
      .select('-__v')
      .populate({
        path: 'players',
        select: '-__v -team'
      });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await FootballTeam.findById(req.params.id)
      .select('-__v')
      .populate({
        path: 'players',
        select: '-__v -team'
      });
    if (!team) {
      return res.status(404).json({ error: messages.TEAM_NOT_FOUND });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = new FootballTeam(req.body);
    const savedTeam = await team.save();
    const populatedTeam = await FootballTeam.findById(savedTeam._id)
      .select('-__v')
      .populate({
        path: 'players',
        select: '-__v -team'
      });
    res.status(201).json(populatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const existingTeam = await FootballTeam.findById(req.params.id);
    if (!existingTeam) {
      return res.status(404).json({ error: messages.TEAM_NOT_FOUND });
    }

    const updatedTeam = await FootballTeam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .select('-__v')
    .populate({
      path: 'players',
      select: '-__v -team'
    });

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await FootballTeam.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: messages.TEAM_NOT_FOUND });
    }

    // Remove team reference from all its players
    await FootballPlayer.updateMany(
      { team: team._id },
      { $unset: { team: 1 } }
    );

    await team.deleteOne();
    res.status(200).json({ message: messages.TEAM_DELETED });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
}; 