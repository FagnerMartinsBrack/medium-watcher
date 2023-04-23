import { DateTime } from 'luxon';
import fetchLastPostDetails from './fetch-last-post-details.mjs';
import shouldNotify from './should-notify.mjs';

import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('✅ Detected new post!', postDetails);
});

import createTweet from './twitter/create-tweet.mjs';
import withJustPublishedTwitterMessage from './twitter/with-just-published-twitter-message.mjs';
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createTweet(withJustPublishedTwitterMessage(postDetails));
  console.log('✅ Executed twitter post handler');
});

import createLinkedInUpdate from './linkedin/create-linkedin-update.mjs';
import withJustPublishedLinkedinMessage from './linkedin/with-just-published-linkedin-message.mjs';
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createLinkedInUpdate(withJustPublishedLinkedinMessage(postDetails));
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
