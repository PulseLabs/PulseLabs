var express = require('express');
var mongoose = require('mongoose');
var db = 'mongodb://pulse:hr352015@ds053954.mongolab.com:53954/pulse-dev';
var app = express();
var Q = require('q');
var port = process.env.PORT || 8888;
var http = require('http').Server(app);
var io = require('socket.io')(http);

//connect to mongo db here
mongoose.connect('mongodb://localhost/pulse');
app.use(express.static('public'));

require('./config/middleware.js')(app, io, express);

app.listen(port, function(req, res) {
  console.log('Server is running.' + port);
});
