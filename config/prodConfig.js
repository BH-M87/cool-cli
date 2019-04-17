'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const Chunks2JsonPlugin = require('chunks-2-json-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const fs = require('fs-extra');
const _ = require('lodash');
const {
  srcPath,
  buildPath,
  distPath,
  nodeModulesPath,
  staticPath
} = require('./paths');
const {
  packageJsonConfig,
  customConfig,
  prodCustomConfig,
  providePluginConfig
} = require('./customConfig');
const {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
} = require('./happyPackPlugin');
const getHtmlPluginConfig = require('../utils/getHtmlPluginConfig');

const {
  cssModules = false,
  prodHtmlTemplate = true,
  bundleLibrary = false,
  library = packageJsonConfig.name,
  libraryTarget,
  hashDigestLength = 8,
  bundleAnalyze = false,
  publicPath = './',
  ts = false,
  typescript = false,
  definePluginConfig = {},
  definePluginProdConfig = {}
} = customConfig;
const isTypeScriptEnable = ts || typescript;

const prodDefaultConfig = {
  mode: 'production',
  bail: true,
  context: srcPath,
  devtool: false,
  entry: './index',
  externals: {},
  output: bundleLibrary
    ? {
        path: distPath,
        publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js',
        crossOriginLoading: 'anonymous',
        library,
        libraryTarget:
          libraryTarget || (bundleLibrary === true ? 'umd' : bundleLibrary)
      }
    : {
        path: buildPath,
        publicPath,
        filename: `[name]${
          hashDigestLength > 0 ? `.[chunkhash:${hashDigestLength}]` : ''
        }.js`,
        chunkFilename: `[name]${
          hashDigestLength > 0 ? `.[chunkhash:${hashDigestLength}]` : ''
        }.js`,
        crossOriginLoading: 'anonymous'
      },
  resolve: {
    modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  resolveLoader: {
    modules: ['node_modules', nodeModulesPath]
  },
  optimization: bundleLibrary
    ? undefined
    : {
        splitChunks: {
          chunks: 'initial'
        },
        runtimeChunk: true
      },
  plugins: [
    new webpack.DefinePlugin(
      _.merge({}, definePluginConfig, definePluginProdConfig)
    ),
    new Chunks2JsonPlugin({
      publicPath,
      outputDir: bundleLibrary ? distPath : buildPath
    }),
    new OptimizeCssAssetsPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name]${
        bundleLibrary || hashDigestLength === 0
          ? ''
          : `.[hash:${hashDigestLength}]`
      }.css`
    }),
    getJsHappyPack('js', 'prod'),
    getCssHappyPack('css', 'prod', cssModules),
    getSassHappyPack('sass', 'prod', cssModules),
    getLessHappyPack('less', 'prod', cssModules),
    getCssHappyPack('cssGlobal', 'prod'),
    getSassHappyPack('sassGlobal', 'prod'),
    getLessHappyPack('lessGlobal', 'prod')
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader', options: { inline: true } }
      },
      {
        test: /\.jsx?$/i,
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
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=cssGlobal']
          },
          {
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=css']
          }
        ]
      },
      {
        test: /\.(scss|sass)$/i,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=sassGlobal']
          },
          {
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=sass']
          }
        ]
      },
      {
        test: /\.less$/i,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=lessGlobal']
          },
          {
            use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=less']
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
        use: 'file-loader?name=[path][name].[ext]'
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
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/i,
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
              context: srcPath,
              name: `[path][name]${
                hashDigestLength > 0 ? `.[hash:${hashDigestLength}]` : ''
              }.[ext]`
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
        use: `file-loader?name=[path][name]${
          hashDigestLength > 0 ? `.[hash:${hashDigestLength}]` : ''
        }.[ext]`
      }
    ]
  }
};

// from user config
if (prodHtmlTemplate) {
  prodDefaultConfig.plugins.push(
    new HtmlPlugin(getHtmlPluginConfig(prodHtmlTemplate))
  );
}
if (providePluginConfig) {
  prodDefaultConfig.plugins.push(
    new webpack.ProvidePlugin(providePluginConfig)
  );
}
// Visualize size of webpack output files with an interactive zoomable treemap.
if (bundleAnalyze) {
  prodDefaultConfig.plugins.push(new BundleAnalyzerPlugin());
}
// add CopyWebpackPlugin
if (fs.existsSync(staticPath)) {
  prodDefaultConfig.plugins.push(
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
  prodDefaultConfig.plugins.push(getJsHappyPack('ts', 'prod'));
  prodDefaultConfig.module.rules.unshift({
    test: /\.tsx?$/i,
    oneOf: [
      {
        resourceQuery: /es6/,
        use: 'happypack/loader?id=ts'
      },
      {
        use: 'happypack/loader?id=ts',
        exclude: /node_modules/
      }
    ]
  });
}

module.exports = _.isFunction(prodCustomConfig)
  ? prodCustomConfig(prodDefaultConfig)
  : _.merge({}, prodDefaultConfig, prodCustomConfig);
