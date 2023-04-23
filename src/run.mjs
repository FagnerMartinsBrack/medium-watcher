import { DateTime } from 'luxon';
import fetchLastPostDetails from './fetch-last-post-details.mjs';
import shouldNotify from './should-notify.mjs';

import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('✅ Detected new post!', postDetails);
});

import createTweet from './twitter/create-tweet.mjs';
import createTwitterMessage from './twitter/create-twitter-message.mjs';
import categoriesToTwitterTags from './twitter/categories-to-twitter-tags.mjs';
const withTwitterMessage = createTwitterMessage(categoriesToTwitterTags);
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createTweet(withTwitterMessage(postDetails));
  console.log('✅ Executed twitter post handler');
});

import createLinkedInUpdate from './linkedin/create-linkedin-update.mjs';
import createLinkedInMessage from './linkedin/create-linkedin-message.mjs';
import categoriesToLinkedInTags from './linkedin/categories-to-linkedin-tags.mjs';
const withLinkedInMessage = createLinkedInMessage(categoriesToLinkedInTags);
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createLinkedInUpdate(withLinkedInMessage(postDetails));
  console.log('✅ Executed LinkedIn post handler');
});

(async function () {
  const lastPostDetails = await fetchLastPostDetails();

  const lastPostDate = DateTime.fromISO(lastPostDetails.date, { zone: 'utc' });
  const nowDate = DateTime.fromISO(new Date().toISOString(), { zone: 'utc' });

  if (shouldNotify({ lastPostDate, nowDate })) {
    eventEmitter.emit('NEW_POST', lastPostDetails);
  } else {
    console.log('⛔️ No new post detected');
  }
}());
