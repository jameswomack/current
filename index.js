//
// Copyright 2012-13 James Womack
//

var request = require('request');

function Current(APIKey, userID) {
  var theURI = "https://www.googleapis.com/plus/v1/people/" + userID + "/activities/public?key=" + APIKey;
 
  var parsedItems = [];
  
  var parseItem = function(item) {
    parsedItems.push({
      body: item.object.content,
      url: item.object.url
    });
  };
  
  var logResponse = function(responseBody) {
    console.info("Fetched " + theURI + " OK!");
    console.info(responseBody);
  }

  this.get = function(req, res) {
    return request({
      uri: theURI
    }, function(error, response, body) {
      var responseBody = JSON.parse(body);
      logResponse(responseBody);
      
      responseBody.items.forEach(parseItem);
      
      return res.send(parsedItems);
    });
  };
  
  return this;
};

module.exports = Current;
