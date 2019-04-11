'use strict';

const exec = require('child_process').execSync;
const chalk = require('chalk');
const { onHelp, consolePreinitHelp } = require('../utils/consoleHelp');

const { status, argv } = onHelp(consolePreinitHelp, ['tnpm', 'cnpm']);
if (status) {
  return;
}

const getNpmType = () => {
  if (argv.tnpm) {
    return 'tnpm';
  } else if (argv.cnpm) {
    return 'cnpm';
  }
  return 'npm';
};

const generatorName = () => {
  if (argv.template === '@alife/engine') {
    return '@alife/generator-engine';
  } else {
    return '';
  }
};

function preinit() {
  console.log(
    chalk.magenta(
      'Install',
      chalk.underline.bgWhite.bold('yoeman'),
      '&',
      chalk.underline.bgWhite.bold('generator-cool'),
      'using',
      getNpmType(),
      'first before init.'
    )
  );
  exec(`${getNpmType()} install -g yo generator-cool ${generatorName()}`, {
    stdio: 'inherit'
  });
}

preinit();
