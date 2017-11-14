'use strict';

const fs = require('fs');
const path = require('path');

const realPath = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(realPath, relativePath);

module.exports = {
  realPath,
  resolveApp,
  get buildPath() {
    return resolveApp('build');
  },
  get srcPath() {
    return resolveApp('src');
  },
  get nodeModulesPath() {
    return resolveApp('node_modules');
  }
};
