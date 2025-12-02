
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const baseUrl = process.env.STAGING_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'STAGING_BASE_URL is not defined.'
  );
}

describe('Staging Smoke Tests - Coffee App', () => {
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

  it('POST /order should successfully place an order', (done) => {
    request(baseUrl)
      .post('/order')
      .send({ coffeeId: 1, quantity: 1 })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('orderId');
        expect(res.body).to.have.property('coffeeName');
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
