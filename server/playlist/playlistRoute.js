var playlistController = require('./playlistController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/create', playListController.create);
  
  app.param('code', playListController.gotoPlaylist);

  // app.get('/:code', playListController.navToLink);

};
