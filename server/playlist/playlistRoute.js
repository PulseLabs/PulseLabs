var playlistController = require('./playlistController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/create', playlistController.newPlaylist);
  // app.param('code', function (req, res, next) {
  //   console.log(req.params.code);
  //   if (!req.params.code) {
  //     req.params.code = '';
  //   }
  //   next();
  // });
  app.post('/:code/add', playlistController.addSong);
  app.post('/:code', playlistController.gotoPlaylist);
  app.get('/:code', playlistController.gotoPlaylist);
  app.delete('/:code/delete/:id', playlistController.deleteSong);
};
