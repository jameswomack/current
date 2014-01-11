var express = require('express');
var app = express();

var Current = require('../index');
var googleAPIKey = process.env.GOOGLE_API_KEY;

app.get('/current/:id', function(req, res) {
  Current(googleAPIKey, req.params.id).get(req, res);
});

app.listen(process.env.DEFAULT_WEB_PORT || 3000);
