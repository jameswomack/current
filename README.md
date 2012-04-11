# Current -- Easily consume a Google Plus user's activity feed.

current = require("./current")("AIzaSyDDwElMl2xwjR_DX6xsBMpu75HwthWi5-A","107535466191092977603")

app.get '/news/amco', (req, res) ->
   current.get(app, req, res)