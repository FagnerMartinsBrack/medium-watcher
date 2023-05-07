import root from 'app-root-path';

export default async (eventEmitter, { fetch } = {}) => {
  const targets = fetch();
  for (const targetName of targets) {
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
