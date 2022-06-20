import 'mocha';

import { app } from '../src/app'
import supertest from 'supertest'
import assert from 'assert'
const request = supertest(app);

describe('# test app.js', function () {
  it('GET /ping ping test', function (done) {
    request
      .get('/ping')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.body.code, 0, 'code码为0');
        done();
      });
  });
  it('GET /404 404 test', function (done) {
    request
      .get('/404')
      .expect(404, done)
  });
});