const chai = require('chai');
const expect = require('chai').expect
const request = require('request');
const assert = chai.assert;
const app = require('../client.js');
const checkTime = app.checkTime;
const checkYear = app.checkYear;
const checkMonth = app.checkMonth;
const checkDay = app.checkDay;
const checkString = app.checkString;
const calcDate = app.calcDate;

describe('Functions', () => {
  it('should format the date and time correctly', () => {
    let input = 'December 24th, 2017, 10:20:40';
    let unitTrial = '1514071240';
    assert.equal(checkTime(input), '10:20:40', 'The time has not been checked correctly');
    assert.equal(checkYear(input), '2017', 'The year has not been checked correctly');
    assert.equal(checkMonth(input), 'december', 'The month has not been checked correctly');
    assert.equal(checkDay(input), '24', 'The day has not been checked correctly');
    assert.equal(checkString(input), '10:20:40 december 24 2017', 'The string has not been checked correctly');
    assert.equal(calcDate(input)['Unixtime'], 1514071240, 'The UnixTime from Natural Time has not been checked correctly');
    expect(calcDate(input)['Natural time']).to.include('Sun Dec 24 2017 10:20:40');
    assert.equal(calcDate(unitTrial)['Unixtime'], 1514071240, 'The UnixTime from Unixtime has not been checked correctly');
    expect(calcDate(unitTrial)['Natural time']).to.include('Sun Dec 24 2017 10:20:40');

  });
});

describe('Route', () => {
  it('should return 200 OK for /home', (done) => {
    request('http://127.0.0.1:5000', (error, response, body) => {
      assert.equal(response.statusCode, 200 || 304, 'The website did not respond correctly');
      done();
    });
  });
});
