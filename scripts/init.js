"use strict";

const exec = require("child_process").execSync;
const chalk = require("chalk");

function init() {
  console.log(chalk.magenta("Init project:"));
  exec("yo cool", {
    stdio: "inherit"
  });
}

init();