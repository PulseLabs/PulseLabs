var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('users', UserSchema);
