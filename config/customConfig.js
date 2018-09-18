"use strict";

const {
  customConfigPath,
  devCustomConfigPath,
  prodCustomConfigPath,
  packageJsonPath
} = require("./paths");
const fs = require("fs-extra");
const _ = require("lodash");
const argv = require("yargs").argv;

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
}

if (fs.existsSync(devCustomConfigPath)) {
  devCustomConfig = require(devCustomConfigPath);
}

if (fs.existsSync(prodCustomConfigPath)) {
  prodCustomConfig = require(prodCustomConfigPath);
}

// process argv
const customArgv = _.pick(argv, [
  "cssModules",
  "devHtmlTemplate",
  "prodHtmlTemplate",
  "bundleLibrary",
  "library",
  "libraryTarget"
]);

_.assign(customConfig, customArgv);

module.exports = {
  packageJsonConfig,
  customConfig,
  devCustomConfig,
  prodCustomConfig
};
