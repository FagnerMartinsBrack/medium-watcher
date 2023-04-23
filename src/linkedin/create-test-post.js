const createLinkedInUpdate = require('./create-linkedin-update');

(async function () {
  await createLinkedInUpdate({
    title: 'Title' + +new Date(),
    text: 'Content' + +new Date(),
    thumbnailImageLink: 'https://www.example.com/image.jpg?hash=' + +new Date(),
    thumbnailLink: 'https://www.example.com/content.html?hash=' + +new Date()
  });
}());
