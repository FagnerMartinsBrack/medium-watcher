import { expect } from 'chai';
import shouldNotify from './should-notify.mjs';

describe('Should notify subscribers of a new post?', () => {
  it('DOES NOT notify if running many hours after the last post', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22 08:01', nowDate: '2023-04-22T18:01:00.000Z' })).to.eql(false);
  }).timeout(10000);

  it('notifies if there\'s a new post in the last hour from execution of the workflow', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22T05:30:00.000Z', nowDate: '2023-04-22T06:29:00.000Z' })).to.eql(true);
  }).timeout(10000);

  it('notifies if there\'s a new post exactly one hour from execution of the workflow', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22T05:30:00.000Z', nowDate: '2023-04-22T06:30:00.000Z' })).to.eql(true);
  }).timeout(10000);
});
