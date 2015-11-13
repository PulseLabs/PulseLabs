var mongoose = require('mongoose');
var Q = require('q');

var PlaylistSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true
  },

  songList: {
    type: Array,
    require: true
  },

  userid: {
    type: String,
    require: true
  }
});

pre('save', function() {

});

module.exports = mongoose.model('playlists', PlaylistSchema);
