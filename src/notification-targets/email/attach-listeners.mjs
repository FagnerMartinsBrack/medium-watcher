import sendEmail from './send-email.mjs';
import toEmailRecipients from './to-email-recipients.mjs';

export default (eventEmitter) => {
  eventEmitter.addListener('NEW_POST', (postDetails) => {
    sendEmail({
      to: toEmailRecipients(process.env),
      subject: postDetails.title,
      body: postDetails.url
    });
    console.log('✅ Executed email post handler');
  });
};
