var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8888, function(req, res) {
  console.log('Server is running.' + 8888);
});
