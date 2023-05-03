## Notification Targets

A folder containing all supported notification targets

### How to add a new Notification Target

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

**title**: The title of the post
**subtitle**: The subtitle of the post (which is parsed as the first `h4` element of the content)
**categories**: An `ArrayLiteral` representing the post categories/tags
**date**: The date the post was published in ISO format
**url**: The URL of the post
**coverUrl**: The URL of the post cover image (which parsed as the first `img` element of the content)