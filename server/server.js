var express = require('express');
var app = express();

app.use(function(req, res) {
  res.status(200).send("Hello World");
});

app.listen(8888, function(req, res) {
  console.log('Server is running.');
});
