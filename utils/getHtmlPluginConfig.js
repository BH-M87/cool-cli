'use strict';

const fs = require('fs-extra');
const { templateHtmlPath, templateEjsPath } = require('../config/paths');

module.exports = htmlTemplate => {
  if (typeof htmlTemplate === 'string') {
    return { template: htmlTemplate };
  }
  if (fs.existsSync(templateHtmlPath)) {
    return { template: templateHtmlPath };
  }
  if (fs.existsSync(templateEjsPath)) {
    return { template: templateEjsPath };
  }
  return {};
};
