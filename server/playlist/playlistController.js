var Playlist = require('./playlistModel.js');
var Q = require('q');

module.exports = {

  newPlaylist: function(req, res, next) {
    console.log("$$$$$$$$$$$*****************", req);
    var userId = 0; //req.user.ObjectId;
    var name = req.body.name;
    var password = req.body.password;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
          name: name,
          songList: [],
          password: password,
          userid: userid
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
  gotoPlaylist: function(req, res, next, code) {
    var password = req.body.password;
    Playlist.findOne({code: code})
      .then(function(playlist) {
        if (playlist) {
          if (password === playlist.password) {
            res.json(playlist);
          } else {
            res.statusCode(403);
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
