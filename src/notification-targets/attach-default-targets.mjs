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
    const moduleLookup = `${root}/src/notification-targets/${targetName}/attach-listeners.mjs`;
    try {
      const targetModule = await import(moduleLookup);
      targetModule.default(eventEmitter);
    } catch(e) {
      if (e.code === 'ERR_MODULE_NOT_FOUND') {
        throw new Error(`Cannot find 'attach-listeners.mjs' file for target '${targetName}'`, { cause: e });
      }
      throw e;
    }
  }
};
