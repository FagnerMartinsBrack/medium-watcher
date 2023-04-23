const createTweet = require('./create-tweet');
const withJustPublishedTwitterMessage = require('./with-just-published-twitter-message');

const testPostDetails = {
  title: 'Test title',
  subtitle: 'by John Doe',
  url: 'https://www.example.com'
};
createTweet(withJustPublishedTwitterMessage(testPostDetails));
