#!/usr/bin/env node

"use strict";

const spawn = require("cross-spawn");
const chalk = require("chalk");

const script = process.argv[2];
const args = process.argv.slice(3);

const run = script => {
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
  const result = spawn.sync(
    "node",
    [require.resolve(`../scripts/${script}`)].concat(args),
    { stdio: "inherit" }
  );
  process.exit(result.status);
};

function execute() {
  switch (script) {
    case "start":
    case "build":
    case "init":
      run(script);
      break;
    default:
      console.log(chalk.red(`Unsupported script ${script}.`));
  }
}

execute();
