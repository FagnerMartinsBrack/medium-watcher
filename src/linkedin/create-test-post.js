import createLinkedInUpdate from './create-linkedin-update.mjs';
import createLinkedInMessage from './create-linkedin-message.mjs';
import categoriesToLinkedInTags from './categories-to-linkedin-tags.mjs';

const withLinkedInMessage = createLinkedInMessage(categoriesToLinkedInTags);

const postDetails = {
  title: 'A LinkedIn Test' + +new Date(),
  subtitle: 'by Mary Jane' + +new Date(),
  coverLink: 'https://www.publicdomainpictures.net/pictures/150000/velka/panda-rouge-1454762675JHG.jpg?hash=' + +new Date(),
  url: 'https://www.example.com/content.html?hash=' + +new Date(),
  categories: ['software-engineering', 'webdev']
};
createLinkedInUpdate(withLinkedInMessage(postDetails));
