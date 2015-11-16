var playlistController = require('./playlistController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/create', playlistController.newPlaylist);
  app.post('/:code/add', playlistController.addSong);
  app.post('/:code', playlistController.gotoPlaylist);
  app.delete('/:code/delete/:id', playlistController.deleteSong);
};
