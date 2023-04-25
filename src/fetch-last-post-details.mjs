import Parser from 'rss-parser';
import querySubtitle from './post-details/query-subtitle.mjs';
import queryImgCoverLink from './post-details/query-cover-img-link.mjs';
import parsePubDateToISO from './post-details/parse-pub-date-to-iso.mjs';

const parseMediumFeed = async () => {
  if (!process.env.MEDIUM_FEED_URL) {
    throw new Error('Could not find MEDIUM_FEED_URL env var, add your medium feed like this: https://medium.com/@fagnerbrack/feed');
  }
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.MEDIUM_FEED_URL);
  return feed;
};

const parseFeedItem = (feedItem) => {
  return {
    title: feedItem.title,
    subtitle: querySubtitle(feedItem['content:encoded']),
    categories: feedItem.categories,
    date: parsePubDateToISO(feedItem.pubDate),
    link: feedItem.link,
    coverLink: queryImgCoverLink(feedItem['content:encoded'])
  };
};

const findLastPostDetails = (feed) => {
  if (!feed.items[0]) throw new Error('No items on feed');
  return parseFeedItem(feed.items[0]);
};

export default async () => {
  const feed = await parseMediumFeed();
  const lastPost = findLastPostDetails(feed);
  return lastPost;
};
