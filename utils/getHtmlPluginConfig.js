'use strict';

const fs = require('fs-extra');
const { templateHtmlPath, templateEjsPath } = require('../config/paths');

module.exports = ({ htmlTemplate, publicPath = 'auto' } = {}) => {
  if (typeof htmlTemplate === 'string') {
    return { template: htmlTemplate, publicPath };
  }
  if (fs.existsSync(templateHtmlPath)) {
    return { template: templateHtmlPath, publicPath };
  }
  if (fs.existsSync(templateEjsPath)) {
    return { template: templateEjsPath, publicPath };
  }
  return { publicPath };
};
