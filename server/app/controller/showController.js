const TVShow = require('../models/TVShow.js');
const TVNetwork = require('../models/TVNetwork.js');
const messages = require('../utils/messages.js');

const getAllShows = async (req, res) => {
  let query = TVShow.find({});

  if (req.query.releaseYear) {
    query = query.where('releaseYear').gte(parseInt(req.query.releaseYear));
  }
  if (req.query.genre) {
    query = query.where('genre').equals(req.query.genre);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('showName');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  query = query.select('showName genre releaseYear').populate('network', 'networkName');

  const shows = await query;
  res.status(200).json({
    data: shows,
    success: true,
    message: `${req.method} - request to Show endpoint`
  });
};

const getShowById = async (req, res) => {
  try {
    const show = await TVShow.findById(req.params.id)
      .select('showName genre releaseYear isActive network')
      .populate('network', 'networkName headquarters');
    if (!show) {
      return res.status(404).json({ error: messages.SHOW_NOT_FOUND });
    }
    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createShow = async (req, res) => {
  try {
    const network = await TVNetwork.findById(req.body.network);
    if (!network) {
      return res.status(400).json({ error: messages.NETWORK_NOT_FOUND });
    }

    const show = new TVShow(req.body);
    const savedShow = await show.save();

    network.shows.push(savedShow._id);
    await network.save();

    const populatedShow = await TVShow.findById(savedShow._id)
      .select('showName genre releaseYear isActive network')
      .populate('network', 'networkName headquarters');
    
    res.status(201).json(populatedShow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateShow = async (req, res) => {
  try {
    const existingShow = await TVShow.findById(req.params.id);
    if (!existingShow) {
      return res.status(404).json({ error: messages.SHOW_NOT_FOUND });
    }

    if (req.body.network) {
      const network = await TVNetwork.findById(req.body.network);
      if (!network) {
        return res.status(400).json({ error: messages.NETWORK_NOT_FOUND });
      }
    }

    const updatedShow = await TVShow.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .select('showName genre releaseYear isActive network')
    .populate('network', 'networkName headquarters');

    res.status(200).json(updatedShow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteShow = async (req, res) => {
  try {
    const show = await TVShow.findById(req.params.id);
    if (!show) {
      return res.status(404).json({ error: messages.SHOW_NOT_FOUND });
    }

    if (show.network) {
      await TVNetwork.findByIdAndUpdate(
        show.network,
        { $pull: { shows: show._id } }
      );
    }

    await show.deleteOne();
    res.status(200).json({ message: messages.SHOW_DELETED });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow
}; 