import { expect } from 'chai';

import toEnabledTargets from './to-enabled-targets.mjs';

describe('Convert ENABLED_TARGETS env var to enabled targets config', () => {
  it('returns single enabled target', () => {
    const envVars = {
      ENABLED_TARGETS: 'twitter'
    };
    expect(toEnabledTargets(envVars)).to.eql(['twitter']);
  });

  it('returns two enabled targets', () => {
    const envVars = {
      ENABLED_TARGETS: 'twitter,facebook'
    };
    expect(toEnabledTargets(envVars)).to.eql(['twitter', 'facebook']);
  });

  it('returns two enabled targetswith spaces between commas', () => {
    const envVars = {
      ENABLED_TARGETS: 'twitter , facebook'
    };
    expect(toEnabledTargets(envVars)).to.eql(['twitter', 'facebook']);
  });

  it('ignores leading comma', () => {
    const envVars = {
      ENABLED_TARGETS: ',twitter'
    };
    expect(toEnabledTargets(envVars)).to.eql(['twitter']);
  });

  it('ignores trailing comma', () => {
    const envVars = {
      ENABLED_TARGETS: 'twitter,'
    };
    expect(toEnabledTargets(envVars)).to.eql(['twitter']);
  });

  it('does not error out when ENABLED_TARGETS is not set', () => {
    const envVars = {};
    expect(toEnabledTargets(envVars)).to.eql([]);
  });
});
