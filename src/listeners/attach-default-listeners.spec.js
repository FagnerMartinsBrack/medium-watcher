import { expect } from 'chai';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

import attachDefaultListeners from './attach-default-listeners.mjs';

describe('Attach Standard Listeners', () => {
  it(`succeeds to attach a standard listener withotu errors`, async () => {
    await attachDefaultListeners(new EventEmitter());
  });
});

describe('Failing to attach non-standard listeners', () => {
  it(`fails when trying to attach a listener that doesn't have its own folder`, async () => {
    try {
      await attachDefaultListeners(new EventEmitter(), { fetchListeners: () => ['test-listener'] });
      expect.fail('Should have thrown an error');
    } catch(e) {
      expect(e).to.eql(new Error(`Cannot find module './test-listener/attach-listeners.mjs'`));
      expect(e.cause.code).to.eql('ERR_MODULE_NOT_FOUND');
    }
  });
});

describe('Successfully attaching non-standard listeners', () => {
  it(`succeeds to attach a listener other than a standard listener`, async () => {
    fs.mkdirSync(path.join(root.toString(), 'src', 'listeners', 'test-listener'));
    fs.writeFileSync(path.join(root.toString(), 'src', 'listeners', 'test-listener', 'attach-listeners.mjs'), 'export default () => {}');
    await attachDefaultListeners(new EventEmitter(), { fetchListeners: () => ['test-listener'] });
  });
  afterEach(() => {
    fs.rmSync(path.join(root.toString(), 'src', 'listeners', 'test-listener', 'attach-listeners.mjs'));
    fs.rmdirSync(path.join(root.toString(), 'src', 'listeners', 'test-listener'));
  });
});
