'use strict';

const HappyPack = require('happypack');
const os = require('os');
const path = require('path');
const { customConfig } = require('./customConfig');

const { targets } = customConfig;

// threads, keep 1 thread remain for management thread
const threads = os.cpus().length - 1;

// env should be one of 'prod' and 'dev'
const getJsHappyPack = (id = 'js', env) => {
  const plugins = (function plugins() {
    const babelPlugins = [
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false
        }
      ],

      // idx: https://github.com/facebookincubator/idx
      [require.resolve('babel-plugin-idx')],

      // As of v7.0.0-beta.55, we've removed Babel's Stage presets.
      // Please consider reading our blog post on this decision at
      // https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets

      // Stage 0
      require.resolve('@babel/plugin-proposal-function-bind'),

      // Stage 1
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
      [
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        { loose: false }
      ],
      [
        require.resolve('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' }
      ],
      [
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        { loose: false }
      ],
      require.resolve('@babel/plugin-proposal-do-expressions'),

      // Stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),

      // Stage 3
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true }
      ],
      require.resolve('@babel/plugin-proposal-json-strings')
    ];
    if (env === 'dev') {
      babelPlugins.unshift(require.resolve('react-hot-loader/babel'));
    }
    return babelPlugins;
  })();
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          require.resolve('@babel/preset-typescript'),
          [require.resolve('@babel/preset-env'), { modules: false, targets }],
          require.resolve('@babel/preset-react')
        ],
        plugins
      }
    }
  ];
  const happyPackConfig = {
    id,
    threads,
    loaders
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getCssHappyPack = (id = 'css', env, cssModules = false) => {
  const loaders = (function loaders() {
    const cssLoaders = [
      {
        loader: 'css-loader',
        options: {
          modules: cssModules
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, '..', 'postcss.config.js')
          }
        }
      }
    ];
    if (env === 'dev') {
      cssLoaders.unshift({
        loader: 'style-loader'
      });
    }
    return cssLoaders;
  })();
  const happyPackConfig = {
    id,
    threads,
    loaders
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getSassHappyPack = (id = 'sass', env, cssModules = false) => {
  const loaders = (function loaders() {
    const sassLoader = [
      {
        loader: 'css-loader',
        query: {
          modules: cssModules,
          importLoaders: 1,
          // minimize: true, // There is not obvious change on file size after minimize.
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, '..', 'postcss.config.js')
          }
        }
      },
      {
        loader: 'sass-loader',
        query: {
          sourceMap: true
        }
      }
    ];
    if (env === 'dev') {
      sassLoader.unshift({
        loader: 'style-loader'
      });
    }
    return sassLoader;
  })();
  const happyPackConfig = {
    id,
    threads,
    loaders
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getLessHappyPack = (id = 'less', env, cssModules = false) => {
  const loaders = (function loaders() {
    const lessLoader = [
      {
        loader: 'css-loader',
        options: {
          modules: cssModules,
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, '..', 'postcss.config.js')
          }
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true
        }
      }
    ];
    if (env === 'dev') {
      lessLoader.unshift({
        loader: 'style-loader'
      });
    }
    return lessLoader;
  })();
  const happyPackConfig = {
    id,
    threads,
    loaders
  };
  return new HappyPack(happyPackConfig);
};

module.exports = {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
};
