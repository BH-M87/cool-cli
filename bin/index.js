#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const { consoleVersion, consoleHelp } = require('../utils/consoleHelp');
const runScript = require('../utils/runScript');
const checkUpdate = require('../utils/checkUpdate');

const script = process.argv[2];
const args = process.argv.slice(3);

const run = script => {
  runScript(`../scripts/${script}`, args);
};

function execute() {
  switch (script) {
    case 'start':
    case 'build':
    case 'init':
    case 'preinit':
      run(script);
      break;
    case undefined:
    case '--help':
    case '-h':
      consoleHelp();
      break;
    case '--version':
    case '-v':
    case '-V':
      consoleVersion();
      break;
    default:
      console.log(
        chalk.red(
          `Unsupported command or option ${chalk.underline.bold(script)}.`
        )
      );
      consoleHelp();
  }
}

checkUpdate();
execute();
