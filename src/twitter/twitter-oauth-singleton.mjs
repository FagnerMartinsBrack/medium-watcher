import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

if (!process.env.TWITTER_CONSUMER_KEY) {
  throw new Error('Could not find TWITTER_CONSUMER_KEY env var, add your twitter consumer key');
}
if (!process.env.TWITTER_CONSUMER_SECRET) {
  throw new Error('Could not find TWITTER_CONSUMER_SECRET env var, add your twitter consumer secret');
}

export default OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});
