var mongoose = require('mongoose');
var crypto = require('crypto');
var Q = require('q');

var PlaylistSchema = new mongoose.Schema({
  code: {
    type: String
  },

  songList: {
    type: Array,
    require: true
  },

  userid: {
    type: String,
    require: true
  },

  password: {
    type: String
  },

  name: {
    type: String
  }
});

var createSha = function(userId) {
  var shasum = crypto.createHash('sha1');
  shasum.update(userid);
  return shasum.digest('hex').slice(0, 5);
}

PlaylistSchema.pre('save', function(next) {
  var code = createSha(this.userid);
  this.code = code;
  next();
});

module.exports = mongoose.model('playlists', PlaylistSchema);
