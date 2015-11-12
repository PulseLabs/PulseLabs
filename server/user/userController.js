var User = require('./userModel.js');
var Promise = require('bluebird');

module.exports = {
//Take the username from spotify profile and
//return associated user from the database, if none, create one and
//return it
  associateProfile: function (username) {
    return new Promise(function(resolve, reject) {
      resolve(
        User.findOne({username: username})
          .then(function (user) {
            if (user) {
              return user;
            } else {
              User.create(
                newUser = {
                  username: username
                })
                .then(function (user) {
                  return user;
                });
              }
          })
      );
    });
  }
};
