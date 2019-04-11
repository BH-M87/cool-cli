'use strict';

const exec = require('child_process').execSync;
const chalk = require('chalk');
const { onHelp, consolePreinitHelp } = require('../utils/consoleHelp');
const getPackageScopeAndName = require('../utils/getPackageScopeAndName');

const { status, argv } = onHelp(consolePreinitHelp, [
  'tnpm',
  'cnpm',
  'template'
]);
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

const getGenerator = () => {
  if (argv.template) {
    const { scope, name } = getPackageScopeAndName(argv.template);
    return `${scope ? `${scope}/` : ''}${
      name.startsWith('generator-') ? name : `generator-${name}`
    }`;
  }
  return 'generator-cool';
};

function preinit() {
  console.log(
    chalk.magenta(
      'Install',
      chalk.underline.bgWhite.bold('yoeman'),
      '&',
      chalk.underline.bgWhite.bold(getGenerator()),
      'using',
      getNpmType(),
      'first before init.'
    )
  );

  exec(`${getNpmType()} install -g yo ${getGenerator()}`, {
    stdio: 'inherit'
  });
}

preinit();
