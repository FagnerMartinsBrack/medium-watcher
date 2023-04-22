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
  // Once Access Token Expires, create a new one manually here: https://www.linkedin.com/developers/tools/oauth?clientId={your_client_id}
  // Change on test-environment.sh
  // Change on https://github.com/FagnerMartinsBrack/medium-watcher/settings/variables/actions
  await shareOnLinkedIn({
    title: 'Title' + +new Date(),
    text: 'Content' + +new Date(),
    thumbnailImageLink: 'https://www.example.com/image.jpg?hash=' + +new Date(),
    thumbnailLink: 'https://www.example.com/content.html?hash=' + +new Date(),
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
    personId: process.env.LINKEDIN_PERSON_ID
  });
}());
