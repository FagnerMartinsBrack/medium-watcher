import { DateTime } from 'luxon';
import fetchPostDetails from './fetch-post-details.mjs';
import shouldNotify from './should-notify.mjs';

import EventEmitter from 'events';
import attachDefaultListeners from './listeners/attach-default-listeners.mjs';

const eventEmitter = new EventEmitter();
eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('✅ Detected new post!', postDetails);
});

(async function () {
  if (!process.env.TEST_MODE) {
    await attachDefaultListeners(eventEmitter);
  }

  const lastPostDetails = await fetchPostDetails();

  const lastPostDate = DateTime.fromISO(lastPostDetails.date, { zone: 'utc' });
  const nowDate = DateTime.fromISO(new Date().toISOString(), { zone: 'utc' });

  if (shouldNotify({ lastPostDate, nowDate })) {
    eventEmitter.emit('NEW_POST', lastPostDetails);
  } else {
    console.log('⛔️ No new post detected');
  }
}());
