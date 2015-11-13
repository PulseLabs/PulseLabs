var Playlist = require('./playlistModel.js');

module.exports = {
  newPlaylist: function(res, req, next) {
    var userId = req.user.ObjectId;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var newPlaylist = {
          songList: [],
          userId: userId
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

  gotoPlaylist: function(req, res, next, code) {
    Playlist.findOne({code: code})
      .then(function(playlist) {
        if (playlist) {
          res.json(playlist);
        } else {
          res.send(404, 'Cannot find playlist.');
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
