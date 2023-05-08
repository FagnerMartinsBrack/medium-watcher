## Notification Targets

A folder containing all supported notification targets

### How to add a new Notification Target

Here's an example of a commit range that I used to implement the `email` Notification Target: https://github.com/FagnerMartinsBrack/medium-watcher/compare/f88114b8579c728a0fdecc4ace7b653e45996792...f5df7269f9465eba8d4b8a2328720c1d384abaef

To add a new target, create a new folder with the name of the target and a file called `attach-listeners.mjs` which is the entry point that exports a function using ES Module `export default` syntax. The function accepts the singleton `EventEmitter` instance.

```javascript
export default (eventEmitter) => {
  eventEmitter.addListener('NEW_POST', (postDetails) => {
    sendToNewTarget(postDetails);
  });
};
```

**Note:** Make sure you create one folder per target and don't share functions across them to keep their code independent and loosely coupled to each other.

### Events

#### NEW_POST

The `NEW_POST` event is emitted when a new post is found in the feed. The callback accepts a `PostDetails` instance.

##### Properties

**title**: The title of the post.<br>
**subtitle**: The subtitle of the post (which is parsed as the first `h4` element of the content).<br>
**categories**: An `ArrayLiteral` representing the post categories/tags.<br>
**date**: The date the post was published in ISO format.<br>
**url**: The URL of the post.<br>
**coverUrl**: The URL of the post cover image (which parsed as the first `img` element of the content).<br>
