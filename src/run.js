const { DateTime } = require('luxon');
const fetchLastPostDetails = require('./fetch-last-post-details');
const shouldNotify = require('./should-notify');
const createTweet = require('./twitter/create-tweet');
const withJustPublishedTwitterMessage = require('./twitter/with-just-published-twitter-message');

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('Detected new post!', postDetails);
});

eventEmitter.addListener('NEW_POST', (postDetails) => {
  createTweet(withJustPublishedTwitterMessage(postDetails));
});

// TODO: Integrate listener for Linkedin

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
