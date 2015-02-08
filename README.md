# Current
* Easily consume a Google Plus user's activity feed.
* Simplifies serving a Google Plus user's activity feed via Node.js & Express
* Compatible with `node > 0.8.10`

### Getting Started
* `npm install` to use as a module
* `npm install -g` to use via cmd-line e.g. `current [user id here]`

### Example
```js
var express = require('express');
var app = express();

var Current = require('current');
var googleAPIKey = process.env.GOOGLE_API_KEY; // optionally hardcode this

app.get('/current/:id', function(req, res) {
  Current(googleAPIKey, req.params.id).get(req, res);
});

app.listen(process.env.DEFAULT_WEB_PORT || 3000);
```

### Testing
* Grab a Google Plus API key and export it in your shell profile to `GOOGLE_API_KEY`
* `npm test`
* `npm run cmd-test`

### Production
* Install using `npm install --production` to skip test dependencies
