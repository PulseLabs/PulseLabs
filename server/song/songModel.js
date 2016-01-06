var mongoose = require('mongoose');
var Q = require('q');

var Schema = mongoose.Schema;
var SongSchema = new Schema({
  uri: {
    type: String
  },

  order: {
    type: Number
  }
});

module.exports = SongSchema;
