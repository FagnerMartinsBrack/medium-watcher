export default (fromSource, { enabledTargets = [] } = {}) => () => {
  const allTargets = fromSource();

  const enabledList = allTargets.filter(target => enabledTargets.includes(target));
  const disabledList = allTargets.filter(target => !enabledTargets.includes(target));

  return enabledTargets.length == 0
    ? { enabledTargets: allTargets, disabledTargets: [] }
    : { enabledTargets: enabledList, disabledTargets: disabledList }
};
