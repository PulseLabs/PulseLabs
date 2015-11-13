var express = require('express');
var mongoose = require('mongoose');
var db = 'mongodb://pulse:hr352015@ds053954.mongolab.com:53954/pulse-dev';
var app = express();
var Q = require('q');

//connect to mongo db here
mongoose.connect('mongodb://localhost/pulse');
app.use(express.static('public'));
require('./config/middleware.js')(app, express);

app.get('/login', function() {
  // auth
  // save user info to user collection
});

app.post('/party', function() {
  //
});

app.listen(8888, function(req, res) {
  console.log('Server is running.' + 8888);
});
