
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const baseUrl = process.env.PROD_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'PROD_BASE_URL is not defined.'
  );
}

describe('Production Smoke Tests - Coffee App (READ ONLY)', () => {
  it('GET /coffees should return a list of coffees', (done) => {
    request(baseUrl)
      .get('/coffees')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('GET /orders should return a list of orders (can be empty)', (done) => {
    request(baseUrl)
      .get('/orders')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
