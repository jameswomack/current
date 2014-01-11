# Current -- Easily consume a Google Plus user's activity feed.
##Google Plus REST API user activity feed reduced to simplicity for Node.js & Express

### Example
```
var express = require('express');
var app = express();

var Current = require('./index');
var googleAPIKey = process.env.GOOGLE_API_KEY;

app.get('/current/:id', function(req, res) {
  Current(googleAPIKey, req.params.id).get(req, res);
});

app.listen(process.env.DEFAULT_WEB_PORT || 3000);
```

### Testing
* Grab a Google Plus API key and export it in your shell profile to `GOOGLE_API_KEY` to run `test/test.js`
* Go to http://localhost:3000/current/107535466191092977603 (or use another user's ID) in your browser 

### Production
* Install using `npm install --production` to skip test dependencies
