export default (createTags) => (postDetails) => ({
  text: [
    `I just published "${postDetails.title} ${postDetails.subtitle}"`,
    `${postDetails.url}`,
    createTags(postDetails.categories)
  ].join('\n\n')
});
