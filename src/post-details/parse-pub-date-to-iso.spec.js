const expect = require('chai').expect;

const parsePubDate = require('./parse-pub-date-to-iso');

it('parses RSS Pub Image Link to ISO', async () => {
  expect(parsePubDate('Sat, 21 Apr 2023 22:02:13 GMT')).to.eql('2023-04-21T22:02:13.000Z');
});
