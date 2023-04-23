import { expect } from 'chai';
import categoriesToLinkedInTags from './categories-to-linkedin-tags.mjs';

describe('Categories to LinkedIn Tags', () => {
  it('splits the dash from categories when writing in the message as tags', () => {
    const categories = ['software-engineering', 'webdev'];
    expect(categoriesToLinkedInTags(categories)).to.eql('#softwareengineering #webdev');
  });
});
