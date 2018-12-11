"use strict";

const chalk = require("chalk");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const portfinder = require("portfinder");
const opener = require("opener");
const mock = require("../utils/mock");
const webpackConfig = require("../config/devConfig");
const {
  customConfig: { notOpenBrowser = false }
} = require("../config/customConfig");
const { onHelp, consoleStartHelp } = require("../utils/consoleHelp");

const { status } = onHelp(consoleStartHelp, [
  "cssModules",
  "devHtmlTemplate",
  "bundleLibrary",
  "library",
  "libraryTarget",
  "notOpenBrowser"
]);
if (status) {
  return;
}

const devServerConfig = webpackConfig.devServer;
let port = Number(devServerConfig.port);
let isFirstCompile = true;

function compile() {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red("Failed to initialize compile."));
    console.log(err.message || err);
    process.exit(1);
  }
  compiler.hooks.done.tap("compilerDone", stats => {
    const messages = formatWebpackMessages(stats.toJson({}, true));

    if (!messages.errors.length && !messages.warnings.length) {
      if (isFirstCompile) {
        const url = `http://${devServerConfig.host}:${port}/`;
        console.log(`The app is running at: ${chalk.cyan(url)}`);
        if (!notOpenBrowser) {
          opener(url);
        }
        isFirstCompile = false;
      }
    } else if (messages.errors.length) {
      console.log(chalk.red("Failed to compile."));
      messages.errors.forEach(message => {
        console.log(message);
      });
    }
  });
  return compiler;
}

function run() {
  const compiler = compile();
  const devServer = new WebpackDevServer(compiler, devServerConfig);
  mock(devServer);

  // promise
  portfinder
    .getPortPromise({ port })
    .then(newPort => {
      // Will use devServerConfig.port if available, otherwise fall back to a random port
      devServer.listen(newPort, devServerConfig.host, err => {
        if (err) {
          return console.log(chalk.red(err));
        }
        if (port !== newPort) {
          console.log(
            chalk.magenta(
              `Port ${port} is occupied, assign new port ${newPort}.`
            )
          );
          port = newPort;
        }
      });
    })
    .catch(err => {
      console.log(`No port available: ${chalk.red(err)}`);
    });
}

run();
