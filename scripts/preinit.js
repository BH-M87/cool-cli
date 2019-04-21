'use strict';

const exec = require('child_process').execSync;
const chalk = require('chalk');
const { onHelp, consolePreinitHelp } = require('../utils/consoleHelp');
const getNpmType = require('../utils/getNpmType');
const getGenerator = require('../utils/getGenerator');

const { status, argv } = onHelp(consolePreinitHelp, [
  'tnpm',
  'cnpm',
  'template'
]);
if (status) {
  return;
}

function preinit() {
  console.log(
    chalk.magenta(
      'Install',
      chalk.underline.bgWhite.bold('yoeman'),
      '&',
      chalk.underline.bgWhite.bold(getGenerator(argv.template)),
      'using',
      getNpmType(argv),
      'first before init.'
    )
  );

  exec(`${getNpmType(argv)} install -g yo ${getGenerator(argv.template)}`, {
    stdio: 'inherit'
  });
}

preinit();
