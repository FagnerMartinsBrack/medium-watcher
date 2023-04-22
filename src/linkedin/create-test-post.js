const shareOnLinkedIn = async ({ title, text, accessToken, thumbnailImageLink, thumbnailLink, personId }) => {
  const response = await fetch('https://api.linkedin.com/v2/shares', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: {
      contentEntities: [
          {
              entityLocation: thumbnailLink,
              thumbnails: [{ resolvedUrl: thumbnailImageLink }]
          }
        ],
        title: title
      },
        distribution: { linkedInDistributionTarget: {} },
        owner: `urn:li:person:${personId}`,
        subject: title,
        text: { text: text }
      })
  });

  const responseBody = await response.text();
  console.log('RESPONSE FOR LINKEDIN POST:', responseBody);
};

(async function () {
  if (!process.env.LINKEDIN_PERSON_ID) {
    throw new Error('Could not find LINKEDIN_PERSON_ID env var, add your linkedin person id which is the "123456789" part of "urn:li:person:123456789"');
  }
  if (!process.env.LINKEDIN_ACCESS_TOKEN) {
    throw new Error('Could not find LINKEDIN_ACCESS_TOKEN env var, add your linkedin access token');
  }
  await shareOnLinkedIn({
    title: 'Title' + +new Date(),
    text: 'Content' + +new Date(),
    thumbnailImageLink: 'https://www.example.com/image.jpg?hash=' + +new Date(),
    thumbnailLink: 'https://www.example.com/content.html?hash=' + +new Date(),

    // Once Access Token Expires, create a new one manually here: https://www.linkedin.com/developers/tools/oauth?clientId=${process.env.LINKEDIN_CLIENT_ID}
    // Add Access Token on test-environment.sh
    // Add Access Token on https://github.com/FagnerMartinsBrack/medium-watcher/settings/variables/actions
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,

    personId: process.env.LINKEDIN_PERSON_ID
  });
}());
