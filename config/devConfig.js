'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require('fs-extra');
const _ = require('lodash');
const {
  srcPath,
  buildPath,
  nodeModulesPath,
  staticPath,
  tsConfigPath
} = require('./paths');
const { customConfig, devCustomConfig } = require('./customConfig');
const {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
} = require('./happyPackPlugin');
const getHtmlPluginConfig = require('../utils/getHtmlPluginConfig');

const {
  cssModules = false,
  devHtmlTemplate = true,
  providePluginConfig,
  publicPath = './',
  ts = false,
  typescript = false,
  definePluginConfig = {},
  definePluginDevConfig = {},
  poll = false
} = customConfig;
const isTypeScriptEnable = ts || typescript;

const devDefaultConfig = {
  mode: 'development',
  context: srcPath,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './index'
  ],
  externals: {},
  output: {
    path: buildPath,
    publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    crossOriginLoading: 'anonymous',
    globalObject: 'this' // fix problem with worker-loader, solve 'Uncaught ReferenceError: window is not defined'
  },
  resolve: {
    modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  resolveLoader: {
    modules: ['node_modules', nodeModulesPath]
  },
  optimization: {
    splitChunks: {
      chunks: 'initial'
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.DefinePlugin(
      _.merge({}, definePluginConfig, definePluginDevConfig)
    ),
    new webpack.HotModuleReplacementPlugin(),
    getJsHappyPack('js', 'dev'),
    getCssHappyPack('css', 'dev', cssModules),
    getSassHappyPack('sass', 'dev', cssModules),
    getLessHappyPack('less', 'dev', cssModules),
    getCssHappyPack('cssGlobal', 'dev'),
    getSassHappyPack('sassGlobal', 'dev'),
    getLessHappyPack('lessGlobal', 'dev')
  ],
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        enforce: 'pre',
        use: { loader: 'raw-loader' }
      },
      {
        test: /\.worker\.js$/i,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.(j|t)sx?$/i,
        oneOf: [
          {
            resourceQuery: /es6/,
            use: 'happypack/loader?id=js'
          },
          {
            use: 'happypack/loader?id=js',
            exclude: /node_modules/
          }
        ]
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            resourceQuery: /global/,
            use: 'happypack/loader?id=cssGlobal'
          },
          {
            use: 'happypack/loader?id=css'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/i,
        oneOf: [
          {
            resourceQuery: /global/,
            use: 'happypack/loader?id=sassGlobal'
          },
          {
            use: 'happypack/loader?id=sass'
          }
        ]
      },
      {
        test: /\.less$/i,
        oneOf: [
          {
            resourceQuery: /global/,
            use: 'happypack/loader?id=lessGlobal'
          },
          {
            use: 'happypack/loader?id=less'
          }
        ]
      },
      {
        exclude: /\.(jpe?g|png|gif)$/i,
        resourceQuery: /external/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: srcPath,
            minetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            context: srcPath,
            minetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot)(\?\w*=\w*)?$/i,
        use: {
          loader: 'file-loader?name=[path][name].[ext]'
        },
        include: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        oneOf: [
          {
            resourceQuery: /external/,
            loader: 'file-loader?name=[path][name].[ext]'
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              context: srcPath
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/i,
        use: {
          loader: 'svg-url-loader',
          options: {
            name: '[path][name].[ext]',
            noquotes: true,
            limit: 8192
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(swf|csv|xl[st]x?|docx?)$/i,
        exclude: /node_modules/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 8001,
    proxy: {},
    compress: true,
    contentBase: buildPath,
    clientLogLevel: 'none',
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    stats: {
      chunks: false,
      colors: true
    },
    watchContentBase: true,
    watchOptions: {
      poll,
      ignored: /node_modules|build|dist|docker/
    }
  }
};

// from user config
if (devHtmlTemplate) {
  devDefaultConfig.plugins.push(
    new HtmlPlugin(getHtmlPluginConfig(devHtmlTemplate))
  );
}
if (providePluginConfig) {
  devDefaultConfig.plugins.push(new webpack.ProvidePlugin(providePluginConfig));
}
// add CopyWebpackPlugin
if (fs.existsSync(staticPath)) {
  devDefaultConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: staticPath,
        to: `${buildPath}/static`
      }
    ])
  );
}
// add TypeScript support
if (isTypeScriptEnable) {
  devDefaultConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsConfigPath,
      checkSyntacticErrors: true
    })
  );
}

module.exports = _.isFunction(devCustomConfig)
  ? devCustomConfig(devDefaultConfig)
  : _.merge({}, devDefaultConfig, devCustomConfig);
