const request = require('supertest');
require('jest');

const app = require('../basic-server');

describe('server', function() {
  test('should respond to GET requests for /classes/messages with a 200 status code', function() {
    return request(app)
      .get('/classes/messages')
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });

  test('should send back parsable stringified JSON', function() {
    return request(app)
      .get('/classes/messages')
      .then(res => {
        const isParsable = function() {
          try {
            JSON.parse(res.text);
            return true;
          } catch (e) {
            return false;
          }
        };

        expect(isParsable(res.text)).toEqual(true);
      });
  });
  test('should send back an object', function() {
    return request(app)
      .get('/classes/messages')
      .then(res => {
        const parsedBody = JSON.parse(res.text);
        expect(typeof parsedBody).toEqual('object');
      });
  });
  test('should send an object containing a `results` array', function() {
    return request(app)
      .get('/classes/messages')
      .then(res => {
        const parsedBody = JSON.parse(res.text);
        expect(typeof parsedBody).toEqual('object');
        expect(Array.isArray(parsedBody.results)).toEqual(true);
      });
  });

  test('should accept POST requests to /classes/messages', function() {
    return request(app)
      .post('/classes/messages')
      .send({
        username: 'Jono',
        message: 'Do my bidding!'
      })
      .then(res => {
        expect(res.status).toEqual(201);
      });
  });
  test('should response with messages that were previously posted', function() {
    return request(app)
      .post('/classes/messages')
      .send({
        username: 'Jono',
        message: 'Do my bidding!'
      })
      .then(() => {
        return request(app)
          .get('/classes/messages')
          .then(res => {
            const messages = JSON.parse(res.text).results;
            expect(messages[0].username).toEqual('Jono');
            expect(messages[0].message).toEqual('Do my bidding!');
          });
      });
  });
  test('Should 404 when asked for a nonexistent endpoint', function() {
    return request(app)
      .get('/codestates')
      .then(res => {
        expect(res.status).toEqual(404);
      });
  });
});
