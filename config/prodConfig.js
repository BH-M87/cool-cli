'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const path = require('path');
const { srcPath, buildPath, nodeModulesPath } = require('./paths');

module.exports = {
  bail: true,
  context: srcPath,
  devtool: false,
  entry: `${srcPath}/index.js`,
  externals: {},
  output: {
    path: buildPath,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash:12].css'),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: false,
    }),
    new HappyPack({
      id: 'js',
      threads: os.cpus().length,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      threads: os.cpus().length,
      loaders: [
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          query: {
            config: path.resolve(__dirname, '..', 'postcss.config.js'),
          },
        },
      ],
    }),
    new HappyPack({
      id: 'scss',
      threads: os.cpus().length,
      loaders: [
        {
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
            // minimize: true, // There is not obvious change on file size after minimize.
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          query: {
            config: path.resolve(__dirname, '..', 'postcss.config.js'),
          },
        },
        {
          loader: 'sass-loader',
          query: {
            sourceMap: true,
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=css',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'happypack/loader?id=scss',
        }),
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=image/svg+xml',
      },
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=8192&name=[path][name].[hash:12].[ext]'],
        exclude: /node_modules/,
      },
      {
        test: /\.swf$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '..', 'node_modules')],
  },
};
