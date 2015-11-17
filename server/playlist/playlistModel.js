var mongoose = require('mongoose');
var crypto = require('crypto');
var SongSchema = require('../song/songModel.js');
var Q = require('q');

var Schema = mongoose.Schema;
var PlaylistSchema = new Schema({

  songList: [SongSchema],

  user: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  name: {
    type: String
  },

  code: {
    type: String
  }
});

var createSha = function(user) {
  var shasum = crypto.createHash('sha1');
  shasum.update(user);
  return shasum.digest('hex').slice(0, 5);
};

PlaylistSchema.pre('save', function(next) {
  var code = createSha(this.user);
  this.code = code;
  next();
});

module.exports = mongoose.model('playlists', PlaylistSchema);
