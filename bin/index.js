#!/usr/bin/env node

'use strict';

const spawn = require('cross-spawn');
const chalk = require('chalk');

const script = process.argv[2];
const args = process.argv.slice(3);

const run = script => {
  const result = spawn.sync(
    'node',
    [require.resolve(`../scripts/${script}`)].concat(args),
    { stdio: 'inherit' }
  );
  process.exit(result.status);
};

function execute() {
  switch (script) {
    case 'start':
    case 'build':
      run(script);
      break;
    default:
      console.log(chalk.red(`Unsupported script ${script}.`));
  }
}

execute();
