//
// Copyright 2012 James Womack & AMCO International Education Services, LLC
//


var Current, request;
request = require('request');
Current = function(APIKey, userID) {
  var parseItem, parsedItems, theURI;
  theURI = "https://www.googleapis.com/plus/v1/people/" + userID + "/activities/public?key=" + APIKey;
  this.get = function(app, req, res) {
    return request({
      uri: theURI
    }, function(error, response, body) {
      var item, responseBody, _i, _len, _ref;
      console.log("Fetched " + theURI + " OK!");
      responseBody = JSON.parse(body);
      console.log(responseBody);
      _ref = responseBody.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        parseItem(item);
      }
      return res.send(parsedItems);
    });
  };
  parsedItems = [];
  parseItem = function(anItem) {
    var theObject;
    theObject = anItem.object;
    return parsedItems.push({
      body: theObject.content,
      url: theObject.url
    });
  };
  return this;
};
module.exports = Current;