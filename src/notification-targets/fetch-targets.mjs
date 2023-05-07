export default (fromSource, { enabledTargets = [] } = {}) => () => {
  const allTargets = fromSource();
  return enabledTargets.length === 0
    ? allTargets
    : allTargets.filter(target => enabledTargets.includes(target));
};
