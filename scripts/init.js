'use strict';

const exec = require('child_process').execSync;
const chalk = require('chalk');
const runScript = require('../utils/runScript');
const { onHelp, consoleInitHelp } = require('../utils/consoleHelp');

const { status, argv } = onHelp(consoleInitHelp, [
  'skipupdate',
  'tnpm',
  'cnpm',
  'template'
]);
if (status) {
  return;
}

function getGenerator() {
  if (argv.template === 'engine') {
    return `@alife/${argv.template}`;
  } else if (argv.template === '@alife/engine') {
    return argv.template;
  }
  return 'cool';
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
    const generator = getGenerator();
    if (generator) {
      preinitArgv.push(`--template ${generator}`);
    }
    runScript('../scripts/preinit', preinitArgv);
  }
  console.log(chalk.magenta('Init project:'));
  exec(`yo ${getGenerator()} --no-insight --no-update-notifier`, {
    stdio: 'inherit'
  });
}

init();
