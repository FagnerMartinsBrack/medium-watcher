import createLinkedInUpdate from './create-linkedin-update.mjs';
import createLinkedInMessage from './create-linkedin-message.mjs';
import categoriesToLinkedInTags from './categories-to-linkedin-tags.mjs';
import findLastPostDetails from '../post-details/find-last-post-details.mjs';

const withLinkedInMessage = createLinkedInMessage(categoriesToLinkedInTags);

const feed = {
  items: [{
    title: 'A LinkedIn Test' + +new Date(),
    'content:encoded': `
      <h4>${'by Mary Jane' + +new Date()}</h4>
      <img src="${'https://www.publicdomainpictures.net/pictures/150000/velka/panda-rouge-1454762675JHG.jpg?hash=' + +new Date()}">
    `,
    categories: ['software-engineering', 'webdev'],
    pubDate: 'Mon, 24 Apr 2023 22:02:12 GMT',
    link: 'https://www.example.com/content.html?hash=' + +new Date()
  }]
};

const postDetails = findLastPostDetails(feed);
createLinkedInUpdate(withLinkedInMessage(postDetails));
