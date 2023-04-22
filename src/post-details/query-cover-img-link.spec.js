const expect = require('chai').expect;
const queryCoverImgLink = require('./query-cover-img-link');

it('queries cover image link', async () => {
  expect(
    queryCoverImgLink('<img src="https://cdn-images-1.medium.com/max/820/1*rA_N7T1yq6aXTjBQE4D8Wg.jpeg">')
  ).to.eql('https://cdn-images-1.medium.com/max/820/1*rA_N7T1yq6aXTjBQE4D8Wg.jpeg');
});
