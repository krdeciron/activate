var express = require('express');

var app = express();

app.use(function(req, res) {
   res.redirect('https://ec2-52-27-36-14.us-west-2.compute.amazonaws.com' + req.originalUrl);
});

module.exports = app
