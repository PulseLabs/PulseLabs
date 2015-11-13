var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: String,
    required: true
  },
  salt: String
});

module.exports = mongoose.model('users', UserSchema);
