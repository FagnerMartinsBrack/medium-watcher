const OAuth = require('oauth-1.0a');
const crypto = require('crypto');


if (!process.env.TWITTER_CONSUMER_KEY) {
  throw new Error('Could not find TWITTER_CONSUMER_KEY env var, add your twitter consumer key');
}
if (!process.env.TWITTER_CONSUMER_SECRET) {
  throw new Error('Could not find TWITTER_CONSUMER_SECRET env var, add your twitter consumer secret');
}

const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

async function createTweet({ text }) {
  const END_POINT_URL = `https://api.twitter.com/2/tweets`;


  if (!process.env.TWITTER_ACCESS_TOKEN) throw new Error('Could not find TWITTER_ACCESS_TOKEN env var, add your twitter access token');
  if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('Could not find TWITTER_ACCESS_TOKEN_SECRET env var, add your twitter access token secret');
  const token = {
    key: process.env.TWITTER_ACCESS_TOKEN,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: END_POINT_URL,
    method: 'POST'
  }, token));

  const response = await fetch(END_POINT_URL, {
    method: 'POST',
    body: JSON.stringify({ text: text }),
    headers: {
      Authorization: authHeader['Authorization'],
      'User-Agent': "Fagner Brack Script - Get in touch with me at https://twitter.com/FagnerBrack",
      'Content-Type': "application/json",
      'Accept': "application/json"
    }
  });

  const responseBody = await response.text();
  console.log('RESPONSE FOR TWITTER POST:', responseBody);
};

createTweet({
  text: 'Content' + +new Date()
});
