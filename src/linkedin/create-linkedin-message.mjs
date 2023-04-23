export default (createTags) => (postDetails) => {
  return {
    title: postDetails.title,
    text: [
      `I just published ${postDetails.title} ${postDetails.subtitle}`,
      postDetails.url,
      createTags(postDetails.categories)
    ].join('\n\n'),
    thumbnailImageLink: postDetails.coverLink,
    thumbnailLink: postDetails.url,
  };
};
