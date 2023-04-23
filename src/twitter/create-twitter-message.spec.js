import { expect } from 'chai';
import createTwitterInMessage from './create-twitter-message.mjs';
import categoriesToLinkedInTags from './categories-to-twitter-tags.mjs';

describe('Create Twitter message', () => {
  it('creates a Twitter message from the post details', () => {
    const withTwitterMessage = createTwitterInMessage(categoriesToLinkedInTags);

    const postDetails = {
      title: 'Any Title',
      subtitle: 'Any Subtitle',
      coverLink: 'https://example.com/img.jpg',
      url: 'https://www.example.com/content.html',
      categories: ['software-engineering', 'webdev']
    };
    expect(withTwitterMessage(postDetails)).to.eql({
      text: "I just published Any Title Any Subtitle\n\nhttps://www.example.com/content.html\n\n#softwareengineering #webdev"
    });
  });
});
