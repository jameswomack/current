var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();

var Current = require('../index');

var googleAPIKey = process.env.GOOGLE_API_KEY;
if(!googleAPIKey){
  throw new ReferenceError('process.env.GOOGLE_API_KEY required');
}

var googlePlusID = process.env.GOOGLE_PLUS_ID;
if(!googlePlusID){
  throw new ReferenceError('process.env.GOOGLE_PLUS_ID required');
}

app.get('/current/:id', function(req, res) {
  Current(googleAPIKey, req.params.id).get(req, res);
});

describe('Current', function(done){
  it('should return JSON', function(done){
    request(app)
      .get('/current/' + googlePlusID)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should throw if userID missing', function(){
    expect(function(){
      Current('');
    }).to.throw(ReferenceError);
  });

  it('should throw if apiKey missing', function(){
    expect(function(){
      Current();
    }).to.throw(ReferenceError);
  });

  it('should return 404 if apiKey & userId are invalid', function(done){
    expect(function(){
      Current('','').get(null, {
        send: function(res){
          expect(res.status).to.equal(404);
          expect(res.message).to.equal('Not Found');
          done();
        }
      });
    }).to.not.throw();
  });
});
