const Playlist = require('../models/playlist');

exports.createPlaylist = async (req, res) => {
  const { name, tracks } = req.body;
  console.log("Request to create playlist received with data:", { name, tracks });
  try {
    const newPlaylist = new Playlist({ name, tracks });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
    console.log("New playlist created:", newPlaylist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPlaylists = async (req, res) => {
  console.log("Request to get all playlists received");
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
    console.log("Playlists retrieved:", playlists);
  } catch (err) {
    console.error("Error retrieving playlists:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  const { id } = req.params;
  console.log("Request to get playlist by ID received with ID:", id);
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      console.log("Playlist not found with ID:", id);
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.json(playlist);
    console.log("Playlist retrieved:", playlist);
  } catch (err) {
    console.error("Error retrieving playlist by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { name, tracks } = req.body;
  const { id } = req.params;
  console.log("Request to update playlist received with data:", { id, name, tracks });
  try {
    const playlist = await Playlist.findByIdAndUpdate(id, { name, tracks }, { new: true });
    if (!playlist) {
      console.log("Playlist not found with ID:", id);
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.json(playlist);
    console.log("Playlist updated:", playlist);
  } catch (err) {
    console.error("Error updating playlist:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;
  console.log("Request to delete playlist received with ID:", id);
  try {
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      console.log("Playlist not found with ID:", id);
      return res.status(404).json({ error: 'Playlist not found' });
    }
    res.json({ message: 'Playlist deleted' });
    console.log("Playlist deleted:", playlist);
  } catch (err) {
    console.error("Error deleting playlist:", err);
    res.status(500).json({ error: err.message });
  }
};
