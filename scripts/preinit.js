"use strict";

const exec = require("child_process").execSync;
const chalk = require("chalk");

function preinit() {
  console.log(
    chalk.magenta(
      "Install ",
      chalk.underline.bgWhite.bold("yoeman"),
      " & ",
      chalk.underline.bgWhite.bold("generator-cool"),
      " first before init."
    )
  );
  exec("npm install -g yo generator-cool", {
    stdio: "inherit"
  });
}

preinit();
