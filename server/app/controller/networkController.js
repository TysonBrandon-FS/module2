const TVNetwork = require('../models/TVNetwork.js');
const TVShow = require('../models/TVShow.js');
const messages = require('../utils/messages.js');

const getAllNetworks = async (req, res) => {
  try {
    const networks = await TVNetwork.find()
      .select('-__v')
      .populate({
        path: 'shows',
        select: '-__v -network'
      });
    res.status(200).json(networks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNetworkById = async (req, res) => {
  try {
    const network = await TVNetwork.findById(req.params.id)
      .select('-__v')
      .populate({
        path: 'shows',
        select: '-__v -network'
      });
    if (!network) {
      return res.status(404).json({ error: messages.NETWORK_NOT_FOUND });
    }
    res.status(200).json(network);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNetwork = async (req, res) => {
  try {
    const network = new TVNetwork(req.body);
    const savedNetwork = await network.save();
    const populatedNetwork = await TVNetwork.findById(savedNetwork._id)
      .select('-__v')
      .populate({
        path: 'shows',
        select: '-__v -network'
      });
    res.status(201).json(populatedNetwork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNetwork = async (req, res) => {
  try {
    const existingNetwork = await TVNetwork.findById(req.params.id);
    if (!existingNetwork) {
      return res.status(404).json({ error: messages.NETWORK_NOT_FOUND });
    }

    const updatedNetwork = await TVNetwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .select('-__v')
    .populate({
      path: 'shows',
      select: '-__v -network'
    });

    res.status(200).json(updatedNetwork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNetwork = async (req, res) => {
  try {
    const network = await TVNetwork.findById(req.params.id);
    if (!network) {
      return res.status(404).json({ error: messages.NETWORK_NOT_FOUND });
    }

    await TVShow.updateMany(
      { network: network._id },
      { $unset: { network: 1 } }
    );

    await network.deleteOne();
    res.status(200).json({ message: messages.NETWORK_DELETED });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNetworks,
  getNetworkById,
  createNetwork,
  updateNetwork,
  deleteNetwork
}; 