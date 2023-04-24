export default (createTags) => (postDetails) => {
  const postComponents = [postDetails.title];
  if (postDetails.subtitle) {
    postComponents.push(postDetails.subtitle);
  }
  return {
    text: [
      `I just published "${postComponents.join(' ')}"`,
      `${postDetails.url}`,
      createTags(postDetails.categories)
    ].join('\n\n')
  };
};
