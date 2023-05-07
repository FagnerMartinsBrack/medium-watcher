import AWS from 'aws-sdk';

export default async ({ to, subject, body }) => {
  if (!process.env.AWS_REGION) throw new Error(`Missing env var AWS_REGION`);
  if (!process.env.AWS_ACCESS_KEY_ID) throw new Error(`Missing env var AWS_ACCESS_KEY_ID`);
  if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error(`Missing env var AWS_SECRET_ACCESS_KEY`);
  if (!process.env.EMAIL_FROM) throw new Error(`Missing env var EMAIL_FROM`);

  var ses = new AWS.SES({ apiVersion: '2010-12-01' });

  const params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: to
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    // ReplyToAddresses: [],
    // ReturnPath: '',
    // ReturnPathArn: '',
    Source: process.env.EMAIL_FROM,
    // SourceArn: ''
  };

  await ses.sendEmail(params).promise();
};
