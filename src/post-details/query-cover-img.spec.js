import { expect } from 'chai';
import queryCoverImg from './query-cover-img.mjs';

describe('Query Cover Image Link', () => {
  it('queries cover image link', async () => {
    expect(
      queryCoverImg('<img src="https://cdn-images-1.medium.com/max/820/1*rA_N7T1yq6aXTjBQE4D8Wg.jpeg">')
    ).to.eql('https://cdn-images-1.medium.com/max/820/1*rA_N7T1yq6aXTjBQE4D8Wg.jpeg');
  });

  it('returns empty String if a cover image link could not be found', async () => {
    expect(
      queryCoverImg('any <b>html</b> without a <p>cover image link</p>')
    ).to.eql('');
  });
});
