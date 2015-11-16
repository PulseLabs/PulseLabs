var mongoose = require('mongoose');
var crypto = require('crypto');
var SongSchema = require('../song/songModel.js');
var Q = require('q');

var Schema = mongoose.Schema; 
var PlaylistSchema = new Schema({

  songList: [SongSchema],

  userid: {
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

var createSha = function(userid) {
  var shasum = crypto.createHash('sha1');
  shasum.update(userid);
  return shasum.digest('hex').slice(0, 5);
};

PlaylistSchema.pre('save', function(next) {
  var code = createSha(this.userid);
  this.code = code;
  next();
});

module.exports = mongoose.model('playlists', PlaylistSchema);
