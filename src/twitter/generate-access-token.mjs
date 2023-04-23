import got from 'got';
import qs from 'querystring';
import Readline from 'readline';

import oauth from './twitter-oauth-singleton.js';

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

async function input(prompt) {
  return new Promise((resolve, reject) => {
    try {
      readline.question(prompt, (out) => {
        readline.close();
        resolve(out);
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function requestToken() {
  const authHeader = oauth.toHeader(oauth.authorize({
    url: requestTokenURL,
    method: 'POST'
  }));

  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}


async function accessToken({ oauth_token }, verifier) {
  const authHeader = oauth.toHeader(oauth.authorize({
    url: accessTokenURL,
    method: 'POST'
  }));
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
  const req = await got.post(path, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}


(async () => {
  try {
    // Get request token
    const oAuthRequestToken = await requestToken();

    // Get authorization
    authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);

    console.log('Please go here and authorize:', authorizeURL.href);
    const pin = await input('Paste the PIN here: ');

    // Get the access token
    const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());

    console.log('Here\'s your new token:');
    console.log(`export TWITTER_ACCESS_TOKEN=${oAuthAccessToken.oauth_token}`);
    console.log(`export TWITTER_ACCESS_TOKEN_SECRET=${oAuthAccessToken.oauth_token_secret}`);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();