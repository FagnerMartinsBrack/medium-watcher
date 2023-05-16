import { expect } from 'chai';

import retrievePostUrl from './retrieve-post-url.mjs';

describe('Retrieve Post URL', () => {
  it('retrieves the post URL from the feed item', () => {
    const feedItem = { link: 'https://www.example.com/2019/01/01/post-title' };
    const config = {};
    const url = retrievePostUrl(feedItem, config);
    expect(url).to.eql('https://www.example.com/2019/01/01/post-title');
  });

  it('replaces the domain of the post URL based on the config', () => {
    const feedItem = { link: 'https://fagnerbrack.medium.com/2019/01/01/post-title' };
    const config = { replace_feed_item_link_domain: 'fagnerbrack.medium.com,fagnerbrack.com' };
    const url = retrievePostUrl(feedItem, config);
    expect(url).to.eql('https://fagnerbrack.com/2019/01/01/post-title');
  });
});
