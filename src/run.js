const { DateTime } = require('luxon');
const fetchLastPostDetails = require('./fetch-last-post-details');
const shouldNotify = require('./should-notify');

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('Detected new post!', postDetails);
});

const createTweet = require('./twitter/create-tweet');
const withJustPublishedTwitterMessage = require('./twitter/with-just-published-twitter-message');
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createTweet(withJustPublishedTwitterMessage(postDetails));
});

const createLinkedInUpdate = require('./linkedin/create-linkedin-update');
const withJustPublishedLinkedinMessage = require('./linkedin/with-just-published-linkedin-message');
eventEmitter.addListener('NEW_POST', (postDetails) => {
  createLinkedInUpdate(withJustPublishedLinkedinMessage(postDetails));
});

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
