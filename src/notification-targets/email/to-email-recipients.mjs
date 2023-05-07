export default (envVars) => {
  if (!envVars.EMAIL_RECIPIENTS) throw new Error(`Missing env var EMAIL_RECIPIENTS`);
  return envVars.EMAIL_RECIPIENTS
    .split(',')
    .filter((target) => target.length > 0)
    .map((target) => target.trim());
};
