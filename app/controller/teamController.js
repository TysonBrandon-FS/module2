const FootballTeam = require('../models/FootballTeam.js');

const getAllTeams = async (req, res) => {
  try {
    const teams = await FootballTeam.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await FootballTeam.findById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = new FootballTeam(req.body);
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await FootballTeam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeam) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await FootballTeam.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json({ message: 'Team deleted successfully' });
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
