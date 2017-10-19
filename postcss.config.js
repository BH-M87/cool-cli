var autoprefixer = require('autoprefixer'); // eslint-disable-line

module.exports = {
  plugins: [
    autoprefixer({
      remove: false,
      browsers: ['last 2 versions', 'ie > 8', 'safari > 7'],
    }),
  ],
};
