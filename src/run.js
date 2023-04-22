const { DateTime } = require('luxon');
const fetchLastPostDetails = require('./fetch-last-post-details');
const shouldNotify = require('./should-notify');

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('Detected new post!', postDetails);
});

// TODO: Integrate listener for Linkedin
// TODO: Integrate listener for Twitter

(async function () {
  const lastPostDetails = await fetchLastPostDetails();

  const lastPostDate = DateTime.fromISO(lastPostDetails.date, { zone: 'utc' });
  const nowDate = DateTime.fromISO(new Date().toISOString(), { zone: 'utc' });

  if (shouldNotify({ lastPostDate, nowDate })) {
    eventEmitter.emit('NEW_POST', lastPostDetails);
  } else {
    console.log('No new post detected');
  }
}());
