var mongoose = require('mongoose');
var Q = require('q');

var Schema = mongoose.Schema;
var SongSchema = new Schema({
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

  order: {
    type: Number
  }
});

module.exports = SongSchema;
// module.exports = mongoose.model('songs', SongSchema);
