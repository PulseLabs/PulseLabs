var User = require('./userModel.js');
var Q = require('q');
var Promise = require('bluebird');

module.exports = {

  associateProfile: function (username) {

    User.findOne({username: username})
      .then(function (user) {
        if (!user) {
          create = Q.nbind(User.create, User);
          newUser = {
            username: username
          };
          return create(newUser);
        } else {
          var promiseUser = function (user) {
            return new Promise(function (resolve, reject) {
              resolve(user);
            });
          };
          return promiseUser(user);
        }
      });
  }
};
