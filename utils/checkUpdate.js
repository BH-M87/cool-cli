'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

module.exports = () => {
  // Checks for available update and returns an instance
  const notifier = updateNotifier({ pkg });
  // Notify using the built-in convenience method
  notifier.notify();
};
