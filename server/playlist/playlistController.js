var Playlist = require('./playlistModel.js');
var Q = require('q');

module.exports = {

  newPlaylist: function(req, res, next) {
    var userid = 0; //req.user.ObjectId;
    var name = req.body.name;
    var password = req.body.password;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
          songList: [],
          userid: userid,
          password: password,
          name: name
        };

    createPlaylist(newPlaylist).then(function (createdPlaylist) {
      if (createdPlaylist) {
        res.json(createdPlaylist);
      }
    })
    .fail(function (error) {
      next(error);
    });
  },

  // client should pass code, and password
  gotoPlaylist: function(req, res, next) {
    var password = 'abc';
    var code = req.params.code;
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function(playlist) {
        if (playlist) {
          if (password === playlist.password) {
            res.json(playlist);
          } else {
            res.send('wrong password');
          }
        } else {
          res.send(404, 'Cannot find playlist.');
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};
