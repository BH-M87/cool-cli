'use strict';

const { customConfigPath, devCustomConfigPath, prodCustomConfigPath } = require('./paths');
const fs = require('fs-extra');

let customConfig = {};
let devCustomConfig = {};
let prodCustomConfig = {};

if (fs.existsSync(customConfigPath)) {
  customConfig = require(customConfigPath);
}

if (fs.existsSync(devCustomConfigPath)) {
  devCustomConfig = require(devCustomConfigPath);
}

if (fs.existsSync(prodCustomConfigPath)) {
  prodCustomConfig = require(prodCustomConfigPath);
}

module.exports = { customConfig, devCustomConfig, prodCustomConfig };
