const Album = require('../models/album');

exports.createAlbum = async (req, res) => {
  const { title, artist, releaseDate } = req.body;
  console.log("Request to create album received with data:", { title, artist, releaseDate });
  try {
    const newAlbum = new Album({ title, artist, releaseDate });
    await newAlbum.save();
    res.status(201).json(newAlbum);
    console.log("New album created:", newAlbum);
  } catch (err) {
    console.error("Error creating album:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAlbums = async (req, res) => {
  console.log("Request to get all albums received");
  try {
    const albums = await Album.find();
    res.json(albums);
    console.log("Albums retrieved:", albums);
  } catch (err) {
    console.error("Error retrieving albums:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAlbumById = async (req, res) => {
  const { id } = req.params;
  console.log("Request to get album by ID received with ID:", id);
  try {
    const album = await Album.findById(id);
    if (!album) {
      console.log("Album not found with ID:", id);
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
    console.log("Album retrieved:", album);
  } catch (err) {
    console.error("Error retrieving album by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateAlbum = async (req, res) => {
  const { title, artist, releaseDate } = req.body;
  const { id } = req.params;
  console.log("Request to update album received with data:", { id, title, artist, releaseDate });
  try {
    const album = await Album.findByIdAndUpdate(id, { title, artist, releaseDate }, { new: true });
    if (!album) {
      console.log("Album not found with ID:", id);
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
    console.log("Album updated:", album);
  } catch (err) {
    console.error("Error updating album:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  const { id } = req.params;
  console.log("Request to delete album received with ID:", id);
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      console.log("Album not found with ID:", id);
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ message: 'Album deleted' });
    console.log("Album deleted:", album);
  } catch (err) {
    console.error("Error deleting album:", err);
    res.status(500).json({ error: err.message });
  }
};
