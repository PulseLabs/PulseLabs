var Playlist = require('./playlistModel.js');

module.exports = {
  // find host by their user id
  findHost: function(res, req, next) {
    var findHost = Q.nbind(Playlist.find,)
  },

  newPlaylist: function(res, req, next) {
    var userId = req.body.userId;
    var createPlaylist = Q.nbind(Playlist.create, Playlist);
    var findPlaylist = Q.nbind(Playlist.findOne, Playlist);

    findPlaylist({userId: userId})
      .then(function (match) {
        if (match) {
          res.send(match);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            visits: 0,
            base_url: req.headers.origin,
            title: title
          };
          return createLink(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
}
