var mongoose = require('mongoose');
var Q = require('q');

var PlaylistSchema = new mongoose.Schema({
  queue: {
    type: Array,
    require: true
  },

  url: {
    type: String,
    require: true
  },

  songList: {
    type: Array,
    require: true
  }

});

module.exports = mongoose.model('playlists', PlaylistSchema);
