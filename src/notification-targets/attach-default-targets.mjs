import root from 'app-root-path';

export default async (eventEmitter, { fetch } = {}) => {
  try {
    const executionPlan = fetch();
    for (const target of executionPlan.disabledTargets) {
      eventEmitter.emit('TARGET_NOT_EXECUTED', { name: target.name, reason: 'Target is disabled' });
    }
    for (const target of executionPlan.enabledTargets) {
      const moduleLookup = `${root}/src/notification-targets/${target.name}/attach-listeners.mjs`;
      try {
        const targetModule = await import(moduleLookup);
        targetModule.default(eventEmitter);
      } catch(e) {
        if (e.code === 'ERR_MODULE_NOT_FOUND') {
          throw new Error(`Cannot find 'attach-listeners.mjs' file for target '${target.name}'`, { cause: e });
        }
        throw e;
      }
    }
  } catch(e) {
    eventEmitter.emit('ERROR', e);
    throw e;
  }
};
