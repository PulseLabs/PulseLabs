var playlistController = require('./playlistController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.param('code', playlistController.gotoPlaylist);
  app.post('/create', playlistController.newPlaylist);
  app.get('/:code', playlistController.gotoPlaylist);
};
