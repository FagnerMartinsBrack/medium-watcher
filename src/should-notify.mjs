import { DateTime } from 'luxon';

export default ({ lastPostDate, nowDate }) => {
  // It checks if a post has been introduced in the last hour
  // The workflow runs every 60 minutes closer to the minute 0 of the our (CronJob "0 * * * *" # Every 1 hour)
  // We make it configurable and read from node.js.yml to get the period it's running but I didn't have time to do that

  const lastPostDateInstance = DateTime.fromISO(lastPostDate, { zone: 'utc' });
  const nowDateInstance = DateTime.fromISO(nowDate, { zone: 'utc' });

  if (process.env.TEST_MODE) {
    console.log('------ Server Date Check ------');
    console.log('LAST POST DATE', lastPostDateInstance.toFormat('yyyy-MM-dd HH:mm:ss ZZ'));
    console.log('NOW DATE', nowDateInstance.toFormat('yyyy-MM-dd HH:mm:ss ZZ'));
    console.log('------ Server Date Check ------');
  }

  return lastPostDateInstance >= nowDateInstance.minus({ hours: 1 });
};
