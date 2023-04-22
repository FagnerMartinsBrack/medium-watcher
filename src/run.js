const fetchLastPostDetails = require('./fetch-last-post-details');

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.addListener('NEW_POST', (postDetails) => {
  console.log('New post found!', postDetails);
});

// TODO: Add listener for Linkedin

(async function () {
  const lastPostDetails = await fetchLastPostDetails();

  // TODO: Only emit post if it's newer than the last one
  console.log('NOW', new Date().toISOString());
  console.log('POST DATE', lastPostDetails.date);

  eventEmitter.emit('NEW_POST', lastPostDetails);
}());
