const Album = require('../models/album');

exports.createAlbum = async (req, res) => {
  const { title, artist, releaseDate } = req.body;
  try {
    const newAlbum = new Album({ title, artist, releaseDate });
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAlbum = async (req, res) => {
  const { title, artist, releaseDate } = req.body;
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, { title, artist, releaseDate }, { new: true });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json({ message: 'Album deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
