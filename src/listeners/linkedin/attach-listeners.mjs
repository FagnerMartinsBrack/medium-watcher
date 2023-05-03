import createLinkedInUpdate from './create-linkedin-update.mjs';
import createLinkedInMessage from './create-linkedin-message.mjs';
import categoriesToLinkedInTags from './categories-to-linkedin-tags.mjs';

const withLinkedInMessage = createLinkedInMessage(categoriesToLinkedInTags);

export default (eventEmitter) => {
  eventEmitter.addListener('NEW_POST', (postDetails) => {
    createLinkedInUpdate(withLinkedInMessage(postDetails));
    console.log('✅ Executed LinkedIn post handler');
  });
};
