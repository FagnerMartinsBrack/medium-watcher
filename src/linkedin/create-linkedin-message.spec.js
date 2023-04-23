import { expect } from 'chai';
import createLinkedInMessage from './create-linkedin-message.mjs';
import categoriesToLinkedInTags from './categories-to-linkedin-tags.mjs';

describe('Create LinkedIn message', () => {
  it('creates a LinkedIn message from the post details', () => {
    const withLinkedInMessage = createLinkedInMessage(categoriesToLinkedInTags);

    const postDetails = {
      title: 'Any Title',
      subtitle: 'Any Subtitle',
      coverLink: 'https://example.com/img.jpg',
      url: 'https://www.example.com/content.html',
      categories: ['software-engineering', 'webdev']
    };
    expect(withLinkedInMessage(postDetails)).to.eql({
      text: "I just published Any Title Any Subtitle\n\nhttps://www.example.com/content.html\n\n#softwareengineering #webdev",
      thumbnailImageLink: "https://example.com/img.jpg",
      thumbnailLink: "https://www.example.com/content.html",
      title: "Any Title",
    });
  });
});
