import { expect } from 'chai';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

import attachDefaultTargets from './attach-default-targets.mjs';

const createEmptyTarget = ({ name }) => {
  fs.mkdirSync(path.join(root.toString(), 'src', 'notification-targets', name));
  fs.writeFileSync(path.join(root.toString(), 'src', 'notification-targets', name, 'attach-listeners.mjs'), 'export default () => {}');
};
const removeTarget = ({ name }) => {
  fs.rmSync(path.join(root.toString(), 'src', 'notification-targets', name, 'attach-listeners.mjs'));
  fs.rmdirSync(path.join(root.toString(), 'src', 'notification-targets', name))
};

describe('Attaching Targets', () => {
  describe('Attach Standard Targets', () => {
    it(`succeeds to attach all standard targets without errors`, async () => {
      await attachDefaultTargets(new EventEmitter());
    });
  });

  describe(`Failing to attach target that doesn't exist`, () => {
    it(`fails when trying to attach a target that doesn't have its own folder`, async () => {
      try {
        await attachDefaultTargets(new EventEmitter(), { fetchTargets: () => ['test-target'] });
        expect.fail('Should have thrown an error');
      } catch(e) {
        expect(e).to.eql(new Error(`Cannot find 'attach-listeners.mjs' file for target 'test-target'`));
        expect(e.cause.code).to.eql('ERR_MODULE_NOT_FOUND');
      }
    });
  });

  describe('Successfully attaching targets', () => {
    beforeEach(() => { createEmptyTarget({ name: 'test-target' }); });
    it(`succeeds to attach a target`, async () => {
      await attachDefaultTargets(new EventEmitter(), { fetchTargets: () => ['test-target'] });
    });
    afterEach(() => { removeTarget({ name: 'test-target' }) });
  });
});
