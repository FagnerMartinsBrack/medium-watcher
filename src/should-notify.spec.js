const expect = require('chai').expect;

const shouldNotify = require('./should-notify');

describe('Should notify subscribers of a new post?', () => {
  it('DOES NOT notify if running many hours after the last post', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22 08:01', nowDate: '2023-04-22T18:01:00.000Z' })).to.eql(false);
  });

  it('notifies if there\'s a new post in the last hour from execution of the workflow', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22T05:30:00.000Z', nowDate: '2023-04-22T06:29:00.000Z' })).to.eql(true);
  });

  it('notifies if there\'s a new post exactly one hour from execution of the workflow', () => {
    expect(shouldNotify({ lastPostDate: '2023-04-22T05:30:00.000Z', nowDate: '2023-04-22T06:30:00.000Z' })).to.eql(true);
  });
});
