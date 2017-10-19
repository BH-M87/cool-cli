'use strict';

const fs = require('fs');
const path = require('path');

const realPath = fs.realpathSync(process.cwd());
module.exports = {
  get buildPath() {
    return path.resolve(realPath, 'build');
  },
  get srcPath() {
    return path.resolve(realPath, 'src');
  },
  get nodeModulesPath() {
    return path.resolve(realPath, 'node_modules');
  },
};
