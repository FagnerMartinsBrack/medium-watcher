export default (fromSource, { enabledTargets = [], testMode = false } = {}) => () => {
  const allTargets = fromSource().map(targetName => ({
    name: targetName
  }));

  if (testMode === true) {
    return { enabledTargets: [], disabledTargets: allTargets.map(target => ({ ...target, reason: 'You are in test mode.' })) }
  }

  if (enabledTargets.length > 0) {
    const enabedTargets = allTargets.filter(target => enabledTargets.includes(target.name));
    const disabledTargets = allTargets.filter(target => !enabledTargets.includes(target.name));
    return {
      enabledTargets: enabedTargets,
      disabledTargets: disabledTargets.map(target => ({ ...target, reason: 'Target is disabled' }))
    };
  }

  return { enabledTargets: allTargets, disabledTargets: [] };
};
