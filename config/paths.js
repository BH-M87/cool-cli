'use strict';

const fs = require('fs-extra');
const path = require('path');

const CONFIG_FILE = '.cool.config.js';
const DEV_CONFIG_FILE = '.cool.dev.config.js';
const PROD_CONFIG_FILE = '.cool.prod.config.js';

const realPath = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(realPath, relativePath);

module.exports = {
  realPath,
  resolveApp,
  get buildPath() {
    return resolveApp('build');
  },
  get distPath() {
    return resolveApp('dist');
  },
  get srcPath() {
    return resolveApp('src');
  },
  get staticPath() {
    return resolveApp('static');
  },
  get nodeModulesPath() {
    return resolveApp('node_modules');
  },
  get customConfigPath() {
    return resolveApp(CONFIG_FILE);
  },
  get devCustomConfigPath() {
    return resolveApp(DEV_CONFIG_FILE);
  },
  get prodCustomConfigPath() {
    return resolveApp(PROD_CONFIG_FILE);
  },
  get packageJsonPath() {
    return resolveApp('package.json');
  }
};
