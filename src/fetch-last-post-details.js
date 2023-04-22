const Parser = require('rss-parser');
const querySubtitle = require('./post-details/query-subtitle');
const queryImgCoverLink = require('./post-details/query-cover-img-link');
const parsePubDateToISO = require('./post-details/parse-pub-date-to-iso');

const parseMediumFeed = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.MEDIUM_FEED_URL);
  return feed;
};

const parseFeedItem = (feedItem) => {
  return {
    title: feedItem.title,
    subtitle: querySubtitle(feedItem['content:encoded']),
    tags: feedItem.categories,
    date: parsePubDateToISO(feedItem.pubDate),
    link: feedItem.link,
    coverLink: queryImgCoverLink(feedItem['content:encoded'])
  };
};

const findLastPostDetails = (feed) => {
  if (!feed.items[0]) throw new Error('No items on feed');
  return parseFeedItem(feed.items[0]);
};

module.exports = async () => {
  const feed = await parseMediumFeed();
  const lastPost = findLastPostDetails(feed);
  return lastPost;
};
