export default (createTags) => (postDetails) => {
  const postComponents = [postDetails.title];
  if (postDetails.subtitle) {
    postComponents.push(postDetails.subtitle);
  }
  return {
    title: postDetails.title,
    text: [
      `I just published "${postComponents.join(' ')}"`,
      postDetails.url,
      createTags(postDetails.categories)
    ].join('\n\n'),
    thumbnailImageLink: postDetails.coverUrl,
    thumbnailLink: postDetails.url,
  };
};
