'use strict';

const { devCustomConfigPath, prodCustomConfigPath } = require('./paths');
const fs = require('fs');

let devCustomConfig = {};
let prodCustomConfig = {};

if (fs.existsSync(devCustomConfigPath)) {
  devCustomConfig = require(devCustomConfigPath);
}

if (fs.existsSync(prodCustomConfigPath)) {
  prodCustomConfig = require(prodCustomConfigPath);
}

module.exports = { devCustomConfig, prodCustomConfig };
