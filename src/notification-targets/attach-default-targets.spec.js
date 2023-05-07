import { expect } from 'chai';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

import attachDefaultTargets from './attach-default-targets.mjs';
import fetchTargets from './fetch-targets.mjs';
import fromFileSystemSource from './from-file-system-source.mjs';

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
      await attachDefaultTargets(new EventEmitter(), { fetch: fetchTargets(fromFileSystemSource) });
    });
  });

  describe(`Failing to attach target that doesn't exist`, () => {
    it(`fails when trying to attach a target that doesn't have its own folder`, async () => {
      try {
        const fromStatic = () => ['test-target'];
        await attachDefaultTargets(new EventEmitter(), { fetch: fetchTargets(fromStatic) });
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
      const fromStatic = () => ['test-target'];
      await attachDefaultTargets(new EventEmitter(), { fetch: fetchTargets(fromStatic) });
    });
    afterEach(() => { removeTarget({ name: 'test-target' }) });
  });

  describe('Emits a TARGET_NOT_EXECUTED event when a target is not executed along with reasons', () => {
    it(`emits the event`, (done) => {
      const eventEmitter = new EventEmitter();
      eventEmitter.addListener('ERROR', e => done(e)); // Make sure errors are not swallowed

      eventEmitter.addListener('TARGET_NOT_EXECUTED', (params) => {
        expect(params.name).to.eql('linkedin');
        expect(params.reason).to.eql('Target is disabled');
        done();
      });

      const fromStatic = () => ['twitter', 'linkedin']
      attachDefaultTargets(eventEmitter, {
        fetch: fetchTargets(fromStatic, {
          enabledTargets: ['twitter']
        })
      });
    });
  });

  describe('Emits a TARGET_NOT_EXECUTED when when in test mode with reasons', () => {
    it(`emits the event`, (done) => {
      const eventEmitter = new EventEmitter();
      eventEmitter.addListener('ERROR', e => done(e)); // Make sure errors are not swallowed

      eventEmitter.addListener('TARGET_NOT_EXECUTED', (params) => {
        expect(params.name).to.eql('twitter');
        expect(params.reason).to.eql('You are in test mode.');
        done();
      });

      const fromStatic = () => ['twitter'];
      attachDefaultTargets(eventEmitter, {
        fetch: fetchTargets(fromStatic, {
          enabledTargets: ['twitter'],
          testMode: true
        })
      });
    });
  });
});
