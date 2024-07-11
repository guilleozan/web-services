const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tracks: { type: Array, default: [] }
});

module.exports = mongoose.model('Playlist', playlistSchema);
