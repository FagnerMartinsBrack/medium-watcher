export default (postDetails) => ({
  text: [
    `I just published ${postDetails.title} ${postDetails.subtitle}`,
    `${postDetails.url}`,
    '#dev #javascript #nodejs #reactjs #typescript #webdev'
  ].join('\n\n')
});
