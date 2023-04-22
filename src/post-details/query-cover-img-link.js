const JSDOM = require('jsdom').JSDOM;

const parseHTML = (html) => new JSDOM(html).window.document;

module.exports = (html) => {
  const coverImageElement = parseHTML(html).querySelectorAll('img')[0];
  if (!coverImageElement) throw new Error('No cover image found');
  return coverImageElement.getAttribute('src');
};
