import { JSDOM } from 'jsdom';

const parseHTML = (html) => new JSDOM(html).window.document;

export default (html) => {
  const coverImageElement = parseHTML(html).querySelectorAll('img')[0];
  return coverImageElement ? coverImageElement.getAttribute('src') : '';
};
