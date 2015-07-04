var express = require('express');

var app = express();

app.use(function(req, res) {
   res.redirect('https://urkkdbde4dd3.rdeciron.koding.io' + req.originalUrl);
});