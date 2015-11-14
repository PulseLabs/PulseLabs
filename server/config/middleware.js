var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var SpotifyStrategy = require('passport-spotify').Strategy;
var userController = require('../user/userController.js');
var jwt = require('jwt-simple');

module.exports = function (app, express) {

  var appKey = 'd18305cfb355420caff075b39be0d8ef';
  var appSecret = 'e1d9ba2ed0d147cfbb1bbdf5e58441d2';

//passport session setup - user serialization, this serializes the entire profile atm

//TODO fix to "storing the user ID when serializing, and finding
//   the user by ID when deserializing"

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
}) ;

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8888/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log("spotify profile: ", profile);
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead. TODO add user to DB / find user
      userController.associateProfile(profile.id)
        .then(function (user) {
          return done(null, user);
        });
    });
  }));

  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use(session({secret: 'wreckless parasol'}));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(__dirname + '/../../public'));

  app.get('/', function(req, res) {
    res.render('index.html', { user: req.user});
  });

  app.get('/api/auth',
    passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
    function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
  });

  app.get('/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }

  // var userRouter = express.Router();
  var playlistRouter = express.Router();
  // app.use('/api/users', userRouter); // use user router for all user request
  var userRouter = express.Router();
  var songRouter = express.Router();
  // var playlistRouter = express.Router();

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/play', playlistRouter); // use play router for playlist request


  // require('../users/userRoute.js')(userRouter);
  require('../song/songRoute.js')(songRouter);

  // require('../users/userRoute.js')(userRouter);
  require('../playlist/playlistRoute.js')(playlistRouter);
};
