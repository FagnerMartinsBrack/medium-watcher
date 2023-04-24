import { JSDOM } from 'jsdom';

const parseHTML = (html) => new JSDOM(html).window.document;

export default (html) => {
  const subtitleElement = parseHTML(html).querySelectorAll('h4')[0];

  return subtitleElement ? subtitleElement.textContent : '';
};
