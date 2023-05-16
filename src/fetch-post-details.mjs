import Parser from 'rss-parser';

import findLastPostDetails from './post-details/find-last-post-details.mjs'

const parseMediumFeed = async () => {
  if (!process.env.MEDIUM_FEED_URL) {
    throw new Error('Could not find MEDIUM_FEED_URL env var, add your medium feed like this: https://medium.com/@fagnerbrack/feed');
  }
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.MEDIUM_FEED_URL);
  return feed;
};

export default async () => {
  const feed = await parseMediumFeed();

  const config = {
    replace_feed_item_link_domain: process.env.REPLACE_FEED_ITEM_LINK_DOMAIN,
  };
  const lastPost = findLastPostDetails(feed, config);
  return lastPost;
};
