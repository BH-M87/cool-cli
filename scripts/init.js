'use strict';

const exec = require('child_process').execSync;
const chalk = require('chalk');
const runScript = require('../utils/runScript');
const { onHelp, consoleInitHelp } = require('../utils/consoleHelp');
const getNpmType = require('../utils/getNpmType');
const getGenerator = require('../utils/getGenerator');

const { status, argv } = onHelp(consoleInitHelp, [
  'skipupdate',
  'tnpm',
  'cnpm',
  'template'
]);
if (status) {
  return;
}

function init() {
  if (!argv.skipupdate) {
    const preinitArgv = [];
    if (argv.tnpm) {
      preinitArgv.push('--tnpm');
    }
    if (argv.cnpm) {
      preinitArgv.push('--cnpm');
    }
    if (argv.template) {
      preinitArgv.push(`--template=${argv.template}`);
    }
    runScript('../scripts/preinit', preinitArgv);
  } else if (argv['create-cool'] && argv.template) {
    exec(`${getNpmType(argv)} install ${getGenerator(argv.template)}`, {
      stdio: 'inherit'
    });
  }
  console.log(chalk.magenta('Init project:'));
  exec(`yo ${argv.template || 'cool'} --no-insight --no-update-notifier`, {
    stdio: 'inherit'
  });
}

init();
