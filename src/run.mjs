import { DateTime } from 'luxon';
import fetchPostDetails from './fetch-post-details.mjs';
import shouldNotify from './should-notify.mjs';

import EventEmitter from 'events';
import attachDefaultTargets from './notification-targets/attach-default-targets.mjs';
import fetchTargets from './notification-targets/fetch-targets.mjs';
import fromFileSystemSource from './notification-targets/from-file-system-source.mjs';

const eventEmitter = new EventEmitter();
eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('✅ Detected new post!', postDetails);
});

(async function () {
  if (!process.env.TEST_MODE) {
    await attachDefaultTargets(eventEmitter, {
      fetch: fetchTargets(fromFileSystemSource)
    });
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
