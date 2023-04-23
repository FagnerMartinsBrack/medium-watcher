import { DateTime } from 'luxon';
import fetchLastPostDetails from './fetch-last-post-details.mjs';
import shouldNotify from './should-notify.mjs';

import EventEmitter from 'events';
import attachLinkedInListeners from './linkedin/attach-linkedin-listeners.mjs';
import attachTwitterListeners from './twitter/attach-twitter-listeners.mjs';

const eventEmitter = new EventEmitter();
eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('✅ Detected new post!', postDetails);
});

if (!process.env.TEST_MODE) {
  attachLinkedInListeners(eventEmitter);
  attachTwitterListeners(eventEmitter);
}

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
