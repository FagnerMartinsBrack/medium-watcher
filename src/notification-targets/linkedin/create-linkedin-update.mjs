export default async ({ title, text, thumbnailImageLink, thumbnailLink }) => {
  if (!process.env.LINKEDIN_PERSON_ID) {
    throw new Error('Could not find LINKEDIN_PERSON_ID env var, add your linkedin person id which is the "123456789" part of "urn:li:person:123456789"');
  }
  if (!process.env.LINKEDIN_ACCESS_TOKEN) {
    throw new Error('Could not find LINKEDIN_ACCESS_TOKEN env var, add your linkedin access token');
  }

  const response = await fetch('https://api.linkedin.com/v2/shares', {
    method: 'POST',
    headers: {
      // Once Access Token Expires, create a new one manually here: https://www.linkedin.com/developers/tools/oauth?clientId=${process.env.LINKEDIN_CLIENT_ID}
      // Add Access Token on test-environment.sh
      // Add Access Token on https://github.com/FagnerMartinsBrack/medium-watcher/settings/variables/actions
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
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
        owner: `urn:li:person:${process.env.LINKEDIN_PERSON_ID}`,
        subject: title,
        text: { text: text }
      })
  });

  const responseBody = await response.text();
  console.log('RESPONSE FOR LINKEDIN POST:', responseBody);
};
