

const Artist = require('../models/artist');

exports.createArtist = async (req, res) => {
  const { name, genre } = req.body;
  console.log("Request to create artist received with data:", { name, genre });
  try {
    const newArtist = new Artist({ name, genre });
    await newArtist.save();
    res.status(201).json(newArtist);
    console.log("New artist created:", newArtist);
  } catch (err) {
    console.error("Error creating artist:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllArtists = async (req, res) => {
  console.log("Request to get all artists received");
  try {
    const artists = await Artist.find();
    res.json(artists);
    console.log("Artists retrieved:", artists);
  } catch (err) {
    console.error("Error retrieving artists:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getArtistById = async (req, res) => {
  const { id } = req.params;
  console.log("Request to get artist by ID received with ID:", id);
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      console.log("Artist not found with ID:", id);
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
    console.log("Artist retrieved:", artist);
  } catch (err) {
    console.error("Error retrieving artist by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  const { name, genre } = req.body;
  const { id } = req.params;
  console.log("Request to update artist received with data:", { id, name, genre });
  try {
    const artist = await Artist.findByIdAndUpdate(id, { name, genre }, { new: true });
    if (!artist) {
      console.log("Artist not found with ID:", id);
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
    console.log("Artist updated:", artist);
  } catch (err) {
    console.error("Error updating artist:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  const { id } = req.params;
  console.log("Request to delete artist received with ID:", id);
  try {
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      console.log("Artist not found with ID:", id);
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json({ message: 'Artist deleted' });
    console.log("Artist deleted:", artist);
  } catch (err) {
    console.error("Error deleting artist:", err);
    res.status(500).json({ error: err.message });
  }
};
