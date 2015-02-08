#!/usr/bin/env node
/*jshint -W030 */

var request = require('request');

function plusFeedFromUserIDAndKey(userID, APIKey){
  return "https://www.googleapis.com/plus/v1/people/" +
         userID + "/activities/public?key=" + APIKey;
}

function Current(APIKey, userID, shouldLog) {
  if(typeof userID !== 'string' ||
     typeof APIKey !== 'string'){
    throw new ReferenceError('User ID & API key needed—you may need to export GOOGLE_API_KEY');
  }

  var theURI = plusFeedFromUserIDAndKey(userID, APIKey);

  function logResponse(responseBody) {
    console.info("Fetched " + theURI + " OK!");
    console.info(responseBody);
  }

  var parsedItems;

  var parseItem = function(item) {
    parsedItems.push({
      body: item.object.content,
      url: item.object.url
    });
  };

  this.get = function(req, res) {
    parsedItems = [];

    return request({
      uri: theURI
    }, function(error, response, body) {
      if(error) throw error;

      var responseBody = {};
      if(response.statusCode === 200){
        responseBody = JSON.parse(body);
        responseBody.items.forEach(parseItem);
      }else{
        parsedItems = {
          status: response.statusCode,
          message: body
        };
      }
      shouldLog && (logResponse(responseBody));

      return res && res.send && res.send(parsedItems);
    });
  };

  return this;
}

module.exports = Current;

if(!module.parent){
  var env  = process.env;
  var args = process.argv.splice(2);
  Current(env.GOOGLE_API_KEY, env.GOOGLE_PLUS_ID || args[0], true).get();
}
