import createTweet from './create-tweet.mjs';
import createTwitterMessage from './create-twitter-message.mjs';
import categoriesToLinkedInTags from './categories-to-twitter-tags.mjs';

const testPostDetails = {
  title: 'Test title',
  subtitle: 'by John Doe',
  url: 'https://www.example.com',
  categories: ['web-development', 'programming']
};
const withTwitterMessage = createTwitterMessage(categoriesToLinkedInTags);
createTweet(withTwitterMessage(testPostDetails));
