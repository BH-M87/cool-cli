"use strict";

const chalk = require("chalk");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const portfinder = require("portfinder");
const mock = require("../utils/mock");
const webpackConfig = require("../config/devConfig");
const { onHelp, consoleStartHelp } = require("../utils/consoleHelp");

const { status } = onHelp(consoleStartHelp, [
  "cssModules",
  "devHtmlTemplate",
  "bundleLibrary",
  "library",
  "libraryTarget",
  "chunkHash"
]);
if (status) {
  return;
}

const devServerConfig = webpackConfig.devServer;

function compile() {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red("Failed to initialize compile."));
    console.log(err.message || err);
    process.exit(1);
  }

  compiler.plugin("done", stats => {
    const messages = formatWebpackMessages(stats.toJson({}, true));

    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green("Compile finished successfully!"));
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

  const basePort = Number(devServerConfig.port);
  portfinder
    .getPortPromise({ port: basePort })
    .then(port => {
      // Will use devServerConfig.port if available, otherwise fall back to a random port
      devServer.listen(port, devServerConfig.host, err => {
        if (err) {
          return console.log(chalk.red(err));
        }

        if (Number(port) !== Number(basePort)) {
          console.log(
            chalk.magenta(
              `Port ${basePort} is occupied, assign new port ${port}.`
            )
          );
        }

        console.log(
          `The app is running at: ${chalk.cyan(
            `http://${devServerConfig.host}:${port}/`
          )}`
        );
      });
    })
    .catch(err => {
      console.log(`No port available: ${chalk.red(err)}`);
    });
}

run();
