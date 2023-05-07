import sendEmail from './send-email.mjs';
import findLastPostDetails from '../../post-details/find-last-post-details.mjs';
import toEmailRecipients from './to-email-recipients.mjs';

const feed = {
  items: [{
    title: 'Test title',
    'content:encoded': `
      <h4>by John Doe</h4>
      <img src="${'https://www.publicdomainpictures.net/pictures/150000/velka/panda-rouge-1454762675JHG.jpg?hash=' + +new Date()}">
    `,
    categories: ['web-development', 'programming'],
    pubDate: 'Mon, 24 Apr 2023 22:02:12 GMT',
    link: 'https://www.example.com'
  }]
};

const postDetails = findLastPostDetails(feed);
await sendEmail({
  to: toEmailRecipients(process.env),
  subject: postDetails.title,
  body: postDetails.url
});
