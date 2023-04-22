const expect = require('chai').expect;
const querySubtitle = require('./query-subtitle');

it('queries the Subtitle', async () => {
  expect(querySubtitle('<h4>by Steve McConnell</h4>')).to.eql('by Steve McConnell');
});
