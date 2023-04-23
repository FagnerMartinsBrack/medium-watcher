import createLinkedInUpdate from './create-linkedin-update.mjs';
import withJustPublishedLinkedInMessage from './with-just-published-linkedin-message.mjs';

const postDetails = {
  title: 'A LinkedIn Test' + +new Date(),
  subtitle: 'by Mary Jane' + +new Date(),
  coverLink: 'https://www.publicdomainpictures.net/pictures/150000/velka/panda-rouge-1454762675JHG.jpg?hash=' + +new Date(),
  url: 'https://www.example.com/content.html?hash=' + +new Date()
};
createLinkedInUpdate(withJustPublishedLinkedInMessage(postDetails));
