var songController = require('./songController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
