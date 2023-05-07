import { expect } from 'chai';

import fetchTargets from './fetch-targets.mjs';

describe('Fetching Enabled Targets', () => {
  it('no target available, no config', () => {
    const fromMemorySource = () => [];
    const fetchFromStaticSource = fetchTargets(fromMemorySource);
    expect(fetchFromStaticSource().enabledTargets).to.eql([]);
  });

  it('targets available, enabled by config', () => {
    const fromMemorySource = () => ['email', 'twitter'];
    const fetchFromStaticSource = fetchTargets(fromMemorySource, {
      enabledTargets: ['email'],
    });
    expect(fetchFromStaticSource().enabledTargets).to.eql(['email']);
  });

  it('targets available, no config', () => {
    const fromMemorySource = () => ['email', 'twitter'];
    const fetchFromStaticSource = fetchTargets(fromMemorySource);
    expect(fetchFromStaticSource().enabledTargets).to.eql(['email', 'twitter']);
  });
});
