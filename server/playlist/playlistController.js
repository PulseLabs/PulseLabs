var Playlist = require('./playlistModel.js');

module.exports = {
  create: function(req, res, next) {
    var userid = req.user.ObjectId;
    var name = req.body.name;
    var password = req.body.password;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
          songList: [],
          name: name,
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

  // have code, and password
  gotoPlaylist: function(req, res, next, code) {
    var password = req.body.password;
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);
    findPlaylist({code: code})
      .then(function(playlist) {
        if (playlist) {
          if (playlist.password === password) {
            res.json(playlist);
          } else {
            res.send('Password does not match');
          }
        } else {
          res.send(404, 'Cannot find playlist.');
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
