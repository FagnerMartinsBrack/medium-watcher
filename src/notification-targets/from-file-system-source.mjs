import fs from 'fs';
import path from 'path';
import root from 'app-root-path';

export default () => {
  return fs
    .readdirSync(path.join(root.toString(), 'src', 'notification-targets'), { withFileTypes: true })
    .filter(dirEntry => dirEntry.isDirectory())
    .map(directory => directory.name);
};
