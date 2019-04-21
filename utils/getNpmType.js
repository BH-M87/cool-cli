'use strict';

module.exports = argv => {
  if (argv.tnpm) {
    return 'tnpm';
  } else if (argv.cnpm) {
    return 'cnpm';
  }
  return 'npm';
};
