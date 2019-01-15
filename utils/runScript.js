'use strict';

const spawn = require('cross-spawn');

module.exports = (script, args = []) =>
  // --no-deprecation, caused by a DeprecationWarning during upgradeing to webpack 4.0
  /* (node:27141) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    at compile (/Users/yonggu/OwnDevWorkspaces/cool-cli/scripts/start.js:23:12)
    at run (/Users/yonggu/OwnDevWorkspaces/cool-cli/scripts/start.js:39:20)
    at Object.<anonymous> (/Users/yonggu/OwnDevWorkspaces/cool-cli/scripts/start.js:74:1)
    at Module._compile (module.js:660:30)
    at Object.Module._extensions..js (module.js:671:10)
    at Module.load (module.js:573:32)
    at tryModuleLoad (module.js:513:12)
    at Function.Module._load (module.js:505:3)
    at Function.Module.runMain (module.js:701:10)
    at startup (bootstrap_node.js:194:16) */
  spawn.sync('node', [require.resolve(script)].concat(args), {
    stdio: 'inherit'
  });
