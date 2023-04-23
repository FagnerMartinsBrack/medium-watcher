import { expect } from 'chai';
import querySubtitle from './query-subtitle.mjs';

it('queries the Subtitle', async () => {
  expect(querySubtitle('<h4>by Steve McConnell</h4>')).to.eql('by Steve McConnell');
});
