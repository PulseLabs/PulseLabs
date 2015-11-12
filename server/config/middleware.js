var morgan = require('morgan');
var bodyParser = require('body-parser');


module.exports = function (app, express) {

  var userRouter = express.Router();
  var playlistRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public'));


  app.use('/api/users', userRouter); // use user router for all user request

  app.use('/api/play', playlistRouter); // use play router for playlist request

  // inject our routers into their respective route files
  require('../users/userRoute.js')(userRouter);
  require('../links/playlistRoute.js')(playlistRouter);
};
