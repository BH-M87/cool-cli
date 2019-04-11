'use strict';

const chalk = require('chalk');
const argv = require('yargs').argv;
const packageJsonConfig = require('../package.json');

const { version, description } = packageJsonConfig;

/**
 * onHelp
 *
 * @param {callback funcion} callback
 * @param {support argvs} supportArgvs
 *
 * @return {{status, argv}} status for either console help info or not, argv for argv
 */
function onHelp(callback, supportArgvs = []) {
  const { help, h, v, V, version } = argv;
  if (!process.argv[2]) {
    return { status: false, argv };
  } else if (v || V || version) {
    consoleVersion();
    return { status: true, argv };
  } else if (!callback) {
    return { status: false, argv };
  } else if (help || h) {
    callback();
    return { status: true, argv };
  } else if (
    supportArgvs.length > 0 &&
    !supportArgvs.find(value => value in argv)
  ) {
    console.log(
      chalk.red(
        `Unsupported command or option ${chalk.underline.bold(
          process.argv[2]
        )}.`
      )
    );
    callback();
    return { status: true, argv };
  }
  return { status: false, argv };
}

function consoleVersion() {
  console.log(`Version: ${version}`);
}
function consoleHelp() {
  console.log(
    `Usage:  cool-cli [command] [options]

${description}
Version: ${version}

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  start          start dev server
  build          build project
  init           init project
  preinit        install yoeman and generator-cool before init
`
  );
}
function consoleInitHelp() {
  console.log(
    `Usage:  cool-cli init [options]

Options:
  -V, --version      output the version number
  -h, --help         output usage information
  -s, --skipupdate   skip update yoeman and generator-cool
  -c, --cnpm         install yoeman and generator-cool using cnpm, default npm
  -t, --tnpm         install yoeman and generator-cool using tnpm, default npm
  --template         use your own yoeman generator as you wish
`
  );
}
function consolePreinitHelp() {
  console.log(
    `Usage:  cool-cli preinit [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information
  -c, --cnpm     install yoeman and generator-cool using cnpm, default npm
  -t, --tnpm     install yoeman and generator-cool using tnpm, default npm
  --template     use your own yoeman generator as you wish
`
  );
}
function consoleStartHelp() {
  console.log(
    `Usage:  cool-cli start [options]

Options:
  -V, --version         output the version number
  -h, --help            output usage information
  --cssModules          turn on the css modules, default to ${chalk.underline(
    'false'
  )}
  --devHtmlTemplate     change the dev template loaction and name,
                        or even set ${chalk.underline(
                          'false'
                        )} to close the html-webpack-plugin function
  --bundleLibrary       bundle your project into library
  --library             set the library name you want to export
  --libraryTarget       set the libray target type, default ${chalk.underline(
    '\'umd\''
  )}
  --notOpenBrowser      not open browser after server start
  --publicPath          webpack config: publicPath in output
  --typescript or --ts  enable TypeScript support
`
  );
}
function consoleBuildHelp() {
  console.log(
    `Usage:  cool-cli build [options]

Options:
  -V, --version         output the version number
  -h, --help            output usage information
  --cssModules          turn on the css modules, default to ${chalk.underline(
    'false'
  )}
  --prodHtmlTemplate    change the prod template loaction and name,
                        or even set ${chalk.underline(
                          'false'
                        )} to close the html-webpack-plugin function
  --bundleLibrary       bundle your project into library
  --library             set the library name you want to export
  --libraryTarget       set the libray target type, default ${chalk.underline(
    '\'umd\''
  )}
  --hashDigestLength    pass a ${chalk.underline(
    'Number'
  )} to set the digest length of the hash, or set to ${chalk.underline(
      0
    )} to disable the hash
  --bundleAnalyze       visualize size of webpack output files with an interactive zoomable treemap, default ${chalk.underline(
    'false'
  )}
  --publicPath          webpack config: publicPath in output
  --typescript or --ts  enable TypeScript support
`
  );
}

module.exports = {
  consoleVersion,
  onHelp,
  consoleHelp,
  consoleInitHelp,
  consolePreinitHelp,
  consoleStartHelp,
  consoleBuildHelp
};
