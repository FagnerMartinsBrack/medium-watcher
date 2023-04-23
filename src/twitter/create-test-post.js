import createTweet from './create-tweet.mjs';
import withJustPublishedTwitterMessage from './with-just-published-twitter-message.mjs';

const testPostDetails = {
  title: 'Test title',
  subtitle: 'by John Doe',
  url: 'https://www.example.com'
};
createTweet(withJustPublishedTwitterMessage(testPostDetails));
