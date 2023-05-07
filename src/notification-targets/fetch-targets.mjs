export default (fromSource, { enabledTargets = [], testMode = false } = {}) => () => {
  const allTargets = fromSource();

  const enabledList = allTargets.filter(target => enabledTargets.includes(target));
  const disabledList = allTargets.filter(target => !enabledTargets.includes(target));

  if (testMode === true) {
    return { enabledTargets: [], disabledTargets: allTargets }
  }

  return enabledTargets.length == 0
    ? { enabledTargets: allTargets, disabledTargets: [] }
    : { enabledTargets: enabledList, disabledTargets: disabledList }
};
