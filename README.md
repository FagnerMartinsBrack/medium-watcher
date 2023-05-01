# MWatcher - Notify LinkedIn/Twitter from Medium RSS Feed (hostless)

Use Github Actions to watch your RSS Feed (tested on Medium) and post to Twitter and LinkedIn (no database)

Check the runs here: https://github.com/FagnerMartinsBrack/medium-watcher/actions

It uses an InMemory EventBus with EventEmitter which you can use to subscribe other providers to the medium post events.

You can add more providers by creating a new listener:

```javascript
eventEmitter.addListener('NEW_POST', (postDetails) => {
  sendToNewProvider(postDetails);
});
```

If you implement a new provider, add each provider in its own folder and create a PR which I'll gladly accept.
Just make sure you create one folder per provider and don't share functions across them to keep their code independent and loosely coupled to each other.

### How to use it

1. Fork this project
2. Add your own environment variables to Github Actions as "Secrets" (https://github.com/you_user/your_project/settings/variables/actions)
3. Add the same variables to an `.env` file hidden in the root to be able to test the project locally.

**Example of local `.env` file:**

```sh
export MEDIUM_FEED_URL=https://medium.com/@fagnerbrack/feed

export LINKEDIN_CLIENT_ID=???
export LINKEDIN_ACCESS_TOKEN=???
export LINKEDIN_PERSON_ID=???

export TWITTER_CONSUMER_KEY=???
export TWITTER_CONSUMER_SECRET=???
export TWITTER_ACCESS_TOKEN=???
export TWITTER_ACCESS_TOKEN_SECRET=???
export TEST_MODE=true
```

### Access Tokens

#### Twitter

To generate a new Twitter Access Token, run:

```
npm run twitter:generate-access-token
```

Follow the console prompts.

#### LinkedIn

To generate a LinkedIn Access Token, do it manually:

https://www.linkedin.com/developers/tools/oauth?clientId={your_app_client_id}

You have to create a company page with your name first.

## Execution

Wait for cron execution (which checks for a new post every hour) or run it manually locally.

To run manually, write `export TEST_MODE=true` in the `.env` file and run:

```
npm run broadcast
```

It will only execute the logging event handler.

### Test Integration

To test Twitter integration locally, run the following command:

```
npm run twitter:create-test-post
```

To test LinkedIn integration locally, run the following command:

```
npm run linkedin:create-test-post
```

----

Let me know if you have issues and please help improve the documentation by creating PRs so others can use it too!

Improvements Required:

- [ ] Automate LinkedIn token refresh. Today it lasts 60 days after you run manually to get an access token and it doesn't refresh (which will make the token valid for a year)
- [ ] Requires your Medium post to not be scheduled near the 30th minute of the CronJob. For example, it may not trigger notifications if the post is scheduled to be published at 08:30 and the CronJob runs at 09:30, given it may delay by up to 5 minutes to start and then it will be too late to consider the post as a new post.
- [ ] Support pulling Medium feed in a variable cadence other than the static "every 1 hour"
- [ ] Support more than one post published in an hour. Currently it only supports notifying one post every hour.
- [ ] Differentiate Medium posts from Medium comments so to notify only posts. Is it possible?
- [ ] Make it platform-agnostic so it doesn't work only on Medium
