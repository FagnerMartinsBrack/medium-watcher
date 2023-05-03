import createTweet from './create-tweet.mjs';
import createTwitterMessage from './create-twitter-message.mjs';
import categoriesToTwitterTags from './categories-to-twitter-tags.mjs';

const withTwitterMessage = createTwitterMessage(categoriesToTwitterTags);

export default (eventEmitter) => {
  eventEmitter.addListener('NEW_POST', (postDetails) => {
    createTweet(withTwitterMessage(postDetails));
    console.log('✅ Executed twitter post handler');
  });
};
