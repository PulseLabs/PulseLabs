var songController = require('./songController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.get('/signin', userController.signin);
};
