import { expect } from 'chai';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

import attachDefaultTargets from './attach-default-targets.mjs';

describe('Attach Standard Targets', () => {
  it(`succeeds to attach a standard target without errors`, async () => {
    await attachDefaultTargets(new EventEmitter());
  });
});

describe('Failing to attach non-standard targets', () => {
  it(`fails when trying to attach a target that doesn't have its own folder`, async () => {
    try {
      await attachDefaultTargets(new EventEmitter(), { fetchTargets: () => ['test-target'] });
      expect.fail('Should have thrown an error');
    } catch(e) {
      expect(e).to.eql(new Error(`Cannot find module './test-target/attach-listeners.mjs'`));
      expect(e.cause.code).to.eql('ERR_MODULE_NOT_FOUND');
    }
  });
});

describe('Successfully attaching non-standard targets', () => {
  it(`succeeds to attach a target other than a standard target`, async () => {
    fs.mkdirSync(path.join(root.toString(), 'src', 'notification-targets', 'test-target'));
    fs.writeFileSync(path.join(root.toString(), 'src', 'notification-targets', 'test-target', 'attach-listeners.mjs'), 'export default () => {}');
    await attachDefaultTargets(new EventEmitter(), { fetchTargets: () => ['test-target'] });
  });
  afterEach(() => {
    fs.rmSync(path.join(root.toString(), 'src', 'notification-targets', 'test-target', 'attach-listeners.mjs'));
    fs.rmdirSync(path.join(root.toString(), 'src', 'notification-targets', 'test-target'));
  });
});
