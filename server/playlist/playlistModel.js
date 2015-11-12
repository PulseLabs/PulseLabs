var mongoose = require('mongoose');
var Q = require('q');

var PlaylistSchema = new mongoose.Schema({
  songname: {
    type: String,
    require: true
  },

  artist: {
    type: String,
    require: true
  },

  url: {
    type: String,
    require: true
  },

  songId: {
    type: String,
    require: true
  }

});

// PlaylistSchema.methods



module.exports = mongoose.model('playlists', PlaylistSchema);
