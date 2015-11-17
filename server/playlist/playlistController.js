var Playlist = require('./playlistModel.js');
var Q = require('q');

module.exports = {

  newPlaylist: function(req, res, next) {
    // console.log("$$$$$$$$$$$*****************", req);
    console.log('*********** ', req.session.passport.user.username);
    var user = req.session.passport.user.username;
    var name = req.body.name;
    // var password = req.body.password;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
      user: user,
      // password: password,
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
    var password = req.body.password;
    var reqUserId = req.session.passport.user.username;
    var password = req.body.password;
    var code = req.params.code;
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function(playlist) {
        if (playlist) {
          if (password === playlist.password) {
            res.json({reqUserId: reqUserId, playlist: playlist});
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
  },

  addSong: function (req, res, next) {
    var code = req.params.code;
    var newSong = req.body;
    // var newSong = {
    //   songname: "What do you mean",
    //   artist: "Justin",
    //   uri: "spotify:artist:1uNFoZAHBGtllmzznpCI3s",
    //   image: "https://i.scdn.co/image/01a39b1c64c6a93037f0a5af6b29e46987fde4ab",
    //   order: 0
    // };

    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function(playlist) {
        if (playlist) {
          playlist.songList.push(newSong);
        }
        playlist.save(function (err, newSong) {
          if (err) return next(err);
          res.json(newSong);
        });
      })
      .fail(function (error) {
        next(error);
      });
  },
  deleteSong: function (req, res, next) {
    next();
  }
};
