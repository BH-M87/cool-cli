'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const fs = require('fs-extra');
const _ = require('lodash');
const { srcPath, buildPath, nodeModulesPath, staticPath } = require('./paths');
const { customConfig, devCustomConfig } = require('./customConfig');
const {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
} = require('./happyPackPlugin');

const {
  cssModules = false,
  devHtmlTemplate = './index.html',
  providePluginConfig,
  publicPath = './'
} = customConfig;

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
    extensions: ['.js', '.json', '.jsx']
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
    new HardSourceWebpackPlugin(),
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
        test: /\.worker\.js$/i,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.(jsx|js)?$/i,
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
          loader: 'file-loader'
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
      ignored: /node_modules/
    }
  }
};

// from user config
if (devHtmlTemplate) {
  devDefaultConfig.plugins.push(new HtmlPlugin({ template: devHtmlTemplate }));
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

module.exports = _.isFunction(devCustomConfig)
  ? devCustomConfig(devDefaultConfig)
  : _.merge({}, devDefaultConfig, devCustomConfig);
