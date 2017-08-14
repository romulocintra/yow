import * as logging from '../utils/logger';
import semver = require('semver');

const log = logging.getLogger(null, true);

export function checkNode(version: string, name: string) {
  if (!semver.satisfies(process.version, version)) {
    log.error(
      `${name} does not support ${process.version} version of node.  Update nodejs to ${version} .`
    );
    process.exit(1);
  }
}
