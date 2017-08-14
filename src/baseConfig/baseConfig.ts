import { checkNode } from '../utils/versions';
import { IBase } from './base';

export function baseConfig(config: IBase) {
  // Check Node Version
  if (config['node-version']) {
    checkNode(config['node-version'], config.name);
  }

  console.log(config['logo-ascii']);
  console.log(config['welcome-message']);
}
