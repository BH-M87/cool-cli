'use strict';

const {
  customConfigPath,
  devCustomConfigPath,
  prodCustomConfigPath,
  packageJsonPath
} = require('./paths');
const fs = require('fs-extra');
const _ = require('lodash');
const { argv } = require('yargs');

let customConfig = {};
let devCustomConfig = {};
let prodCustomConfig = {};
let packageJsonConfig = {};

if (fs.existsSync(packageJsonPath)) {
  packageJsonConfig = require(packageJsonPath);
}

if (fs.existsSync(customConfigPath)) {
  customConfig = require(customConfigPath);
  // valid config:
  //     'cssModules',
  //     'devHtmlTemplate',
  //     'prodHtmlTemplate',
  //     'bundleLibrary',
  //     'library',
  //     'libraryTarget',
  //     'providePluginConfig',
  //     'poll',
}

if (fs.existsSync(devCustomConfigPath)) {
  devCustomConfig = require(devCustomConfigPath);
}

if (fs.existsSync(prodCustomConfigPath)) {
  prodCustomConfig = require(prodCustomConfigPath);
}

// process argv
const customArgv = _.pick(argv, [
  'notOpenBrowser',
  'cssModules',
  'devHtmlTemplate',
  'prodHtmlTemplate',
  'bundleLibrary',
  'library',
  'libraryTarget',
  'hashDigestLength',
  'bundleAnalyze',
  'publicPath',
  'typescript',
  'ts',
  'staticPath',
  'poll'
]);

_.assign(customConfig, customArgv);

module.exports = {
  packageJsonConfig,
  customConfig,
  devCustomConfig,
  prodCustomConfig
};
