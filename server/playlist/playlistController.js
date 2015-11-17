var Playlist = require('./playlistModel.js');
var Q = require('q');

module.exports = {

  newPlaylist: function(req, res, next) {
    // console.log("$$$$$$$$$$$*****************", req);
    var user = req.session.passport.user.username;
    var name = req.body.name;
    var password = req.body.password;
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
      user: user,
      // password: password,
      name: name
    };

    findPlaylist({user: user})
    .then(function (foundList) {
      if (foundList) {
        res.json("Playlist already exists on this username");
      } else {
        createPlaylist(newPlaylist).then(function (createdPlaylist) {
          if (createdPlaylist) {
            res.json(createdPlaylist);
          }
        })
        .fail(function (error) {
          next(error);
        });
      }
    });
  },

  // client should pass code, and password
  gotoPlaylist: function(req, res, next) {
    var reqUserId = req.session.passport.user.username;
    var password = req.body.password;
    var code = req.params.code;
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function(playlist) {
        if (playlist) {
          // if (password === playlist.password) {
          //   res.json({reqUserId: reqUserId, playlist: playlist});
          // } else {
          //   res.send('wrong password');
          // }
          next();
        } else {
          res.send(404, 'Cannot find playlist.');
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  addSong: function (req, res, next) {
    var code = req.params.code;
    var newSong = req.body;

    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function (playlist) {
        console.log(playlist);
        if (playlist) {
          playlist.songList.push(newSong);
        }
        playlist.save(function (err, newSong) {
          if (err) {
            console.log('addsong');
            console.log(err);
            return next(err);
          }
          res.json(newSong);
        });
      })
      .fail(function (error) {
        console.log('addsong');
        console.log("ERROR", error);
        next(error);
      });
  },
  deleteSong: function (req, res, next) {
    next();
  }
};
