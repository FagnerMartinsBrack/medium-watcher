import querySubtitle from './query-subtitle.mjs';
import queryImgCoverUrl from './query-cover-img.mjs';
import parsePubDateToISO from './parse-pub-date-to-iso.mjs';

const parseFeedItem = (feedItem) => {
  return {
    title: feedItem.title,
    subtitle: querySubtitle(feedItem['content:encoded']),
    categories: feedItem.categories,
    date: parsePubDateToISO(feedItem.pubDate),
    url: feedItem.link,
    coverUrl: queryImgCoverUrl(feedItem['content:encoded'])
  };
};

export default (feed) => {
  if (!feed.items[0]) throw new Error('No items on feed');
  return parseFeedItem(feed.items[0]);
};
