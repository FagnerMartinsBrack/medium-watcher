export default (envVars) => {
  return (envVars.ENABLED_TARGETS || '')
    .split(',')
    .filter((target) => target.length > 0)
    .map((target) => target.trim());
};
