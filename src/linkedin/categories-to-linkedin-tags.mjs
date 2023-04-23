export default (categories) => {
  return categories
    .map(category => `#${category}`.split('-').join(''))
  .join(' ');
};
