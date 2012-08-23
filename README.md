[![build status](https://secure.travis-ci.org/jameswomack/current.png)](http://travis-ci.org/jameswomack/current)
# Current -- Easily consume a Google Plus user's activity feed.
##Google Plus REST API user activity feed reduced to simplicity for Node.js & Express

current = require("current")("yourAPIKeyHere","yourUserIDHere")

app.get '/news/amco', (req, res) ->
   current.get(app, req, res)

