import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

const fetchDefaultListeners = () => {
  return fs
    .readdirSync(path.join(root.toString(), 'src', 'listeners'), { withFileTypes: true })
    .filter(dirEntry => dirEntry.isDirectory())
    .map(directory => directory.name)
};

export const attachDefaultListeners = async (eventEmitter, { fetchListeners = fetchDefaultListeners } = {}) => {
  const defaultListeners = fetchListeners();
  for (const listenerName of defaultListeners) {
    try {
      const listenerModule = await import(`${root}/src/listeners/${listenerName}/attach-listeners.mjs`);
      listenerModule.default(eventEmitter);
    } catch(e) {
      throw new Error(`Cannot find module './${listenerName}/attach-listeners.mjs'`, { cause: e });
    }
  }
};

export default attachDefaultListeners;
