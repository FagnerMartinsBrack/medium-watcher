import { expect } from 'chai';

import toEmailRecipients from './to-email-recipients.mjs';

describe('Convert EMAIL_RECIPIENTS env var to email recipients config', () => {
  it('returns single email recipient', () => {
    const envVars = {
      EMAIL_RECIPIENTS: 'one@example.com'
    };
    expect(toEmailRecipients(envVars)).to.eql(['one@example.com']);
  });

  it('returns two email recipients', () => {
    const envVars = {
      EMAIL_RECIPIENTS: 'one@example.com,two@example.com'
    };
    expect(toEmailRecipients(envVars)).to.eql(['one@example.com', 'two@example.com']);
  });

  it('returns two email recipientswith spaces between commas', () => {
    const envVars = {
      EMAIL_RECIPIENTS: 'one@example.com , two@example.com'
    };
    expect(toEmailRecipients(envVars)).to.eql(['one@example.com', 'two@example.com']);
  });

  it('ignores leading comma', () => {
    const envVars = {
      EMAIL_RECIPIENTS: ',twitter'
    };
    expect(toEmailRecipients(envVars)).to.eql(['twitter']);
  });

  it('ignores trailing comma', () => {
    const envVars = {
      EMAIL_RECIPIENTS: 'twitter,'
    };
    expect(toEmailRecipients(envVars)).to.eql(['twitter']);
  });
});
