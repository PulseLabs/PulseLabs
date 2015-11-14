var mongoose = require('mongoose');
var Q = require('q');

var SongSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: true
  },

  artist: {
    type: String,
    required: true
  },

  uri: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: 'https://d3m79pznqer0b2.cloudfront.net/default-album-image.jpg'
  },

  userId: {
    type: String,
    required: true
  },

  order: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('songs', SongSchema);
