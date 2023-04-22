const JSDOM = require('jsdom').JSDOM;

const parseHTML = (html) => new JSDOM(html).window.document;

module.exports = (html) => {
  const subtitleElement = parseHTML(html).querySelectorAll('h4')[0];
  if (!subtitleElement) throw new Error('No subtitle found');

  return subtitleElement.textContent;
};
