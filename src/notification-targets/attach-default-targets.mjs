import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

const fetchDefaultTargets = () => {
  return fs
    .readdirSync(path.join(root.toString(), 'src', 'notification-targets'), { withFileTypes: true })
    .filter(dirEntry => dirEntry.isDirectory())
    .map(directory => directory.name)
};

export default async (eventEmitter, { fetchTargets = fetchDefaultTargets } = {}) => {
  const defaultTargets = fetchTargets();
  for (const targetName of defaultTargets) {
    try {
      const targetModule = await import(`${root}/src/notification-targets/${targetName}/attach-listeners.mjs`);
      targetModule.default(eventEmitter);
    } catch(e) {
      throw new Error(`Cannot find module './${targetName}/attach-listeners.mjs'`, { cause: e });
    }
  }
};
