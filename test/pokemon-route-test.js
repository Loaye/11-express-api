'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('pokemon routes', function() {
  var pokemon = null;

  describe('POST: /api/pokemon', function() {
    it('should return a pokemon', function(done) {
      request.post('localhost:8000/api/pokemon')
      .send({name: 'test name', content: 'test content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.type).to.equal('test content');
        expect(res.body.gen).to.equal('test gen')
        pokemon = res.body;
        done();
      });
    });
  });

  describe('POST: /api', function() {
    it('should return 400', function(done) {
      request.post('localhost:8000/api/pokemon')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/pokemon', function() {
    it('should return a pokemon', function(done){
      request.get(`localhost:8000/api/pokemon?id=${pokemon.id}`)
      .end(function(err, res) {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.type).to.equal('test type');
        expect(res.body.gen).to.equal('test gen');
        console.log('GET request pokemon:', res.body);
        done();
      });
    });
  });

  describe('GET: /api/pokemon', function() {
    it('should return 400 bad request', function(done) {
      request.get('localhost:8000/api/pokemon?id=')
      .end((err, res) => {
        expect(res.status)to.equal(400);
        done();
      });
    });
  });
})