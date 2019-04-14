'use strict';

module.exports = (packageName = '') => {
  const match = /^(@[a-z0-9-~][a-z0-9-._~]*)\/([a-z0-9-~][a-z0-9-._~]*$)/.exec(
    packageName
  );
  return match ? { scope: match[1], name: match[2] } : { name: packageName };
};
