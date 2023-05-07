import { expect } from 'chai';

import fetchTargets from './fetch-targets.mjs';

describe('Fetching Targets Execution Plan', () => {
  it('no target available, no config', () => {
    const fromMemorySource = () => [];
    const fetchFromStaticSource = fetchTargets(fromMemorySource);
    expect(fetchFromStaticSource().enabledTargets).to.eql([]);
    expect(fetchFromStaticSource().disabledTargets).to.eql([]);
  });

  it('targets available, enabled by config', () => {
    const fromMemorySource = () => ['email', 'twitter'];
    const fetchFromStaticSource = fetchTargets(fromMemorySource, {
      enabledTargets: ['email'],
    });
    expect(fetchFromStaticSource().enabledTargets[0]).to.have.property('name', 'email');
    expect(fetchFromStaticSource().disabledTargets[0]).to.have.property('name', 'twitter');
  });

  it('targets available, no config', () => {
    const fromMemorySource = () => ['email', 'twitter'];
    const fetchFromStaticSource = fetchTargets(fromMemorySource);
    expect(fetchFromStaticSource().enabledTargets[0]).to.have.property('name', 'email');
    expect(fetchFromStaticSource().enabledTargets[1]).to.have.property('name', 'twitter');
    expect(fetchFromStaticSource().disabledTargets).to.eql([]);
  });
});
