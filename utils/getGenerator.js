'use strict';
const getPackageScopeAndName = require('./getPackageScopeAndName');

module.exports = generator => {
  if (generator) {
    const { scope, name } = getPackageScopeAndName(generator);
    return `${scope ? `${scope}/` : ''}${
      name.startsWith('generator-') ? name : `generator-${name}`
    }`;
  }
  return 'generator-cool';
};
