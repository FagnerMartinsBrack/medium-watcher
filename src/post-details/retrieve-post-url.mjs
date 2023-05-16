export default (feedItem, config) => {
  console.log('Found config when retrieving post URL', config);
  if (config.replace_feed_item_link_domain) {
    const components = config.replace_feed_item_link_domain.split(',');
    if (components.length === 2) {
      return feedItem.link.split(components[0]).join(components[1]);
    }
  }
  return feedItem.link;
};
