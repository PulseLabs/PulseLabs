var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connect to mongo db here
app.use(express.static('public'));
require('./config/middleware.js')(app, express);

app.listen(8888, function(req, res) {
  console.log('Server is running.' + 8888);
});
