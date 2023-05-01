import { expect } from 'chai';
import categoriesToLinkedInTags from './categories-to-twitter-tags.mjs';

describe('Categories to Twitter Tags', () => {
  it('splits the dash from categories when writing in the message as tags', () => {
    const categories = ['software-engineering', 'webdev'];
    expect(categoriesToLinkedInTags(categories)).to.eql('#softwareengineering #webdev');
  });
});
