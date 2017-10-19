'use strict';

const fs = require('fs');
const path = require('path');

const realPath = fs.realpathSync(process.cwd());

module.export = {
  buildPath: path.resolve(realPath, 'build'),
  srcPath: path.resolve(realPath, 'src'),
  nodeModulesPath: path.resolve(realPath, 'node_modules'),
};
