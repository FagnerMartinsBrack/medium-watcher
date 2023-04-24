import { expect } from 'chai';
import querySubtitle from './query-subtitle.mjs';

describe('Query Subtitle', () => {
  it('queries the Subtitle', async () => {
    expect(querySubtitle('<h4>by Steve McConnell</h4>')).to.eql('by Steve McConnell');
  });

  it('returns empty String when it cannot find the subtitle', async () => {
    expect(
      querySubtitle('Any content <b> or html </b> without an actual header with subtitle')
    ).to.eql('');
  });
});
