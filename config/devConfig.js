"use strict";

const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlPlugin = require("html-webpack-plugin");
const os = require("os");
const path = require("path");
const _ = require("lodash");
const { srcPath, buildPath, nodeModulesPath } = require("./paths");
const { customConfig, devCustomConfig } = require("./customConfig");

const { cssModules = false } = customConfig;

const devDefaultConfig = {
  mode: "development",
  context: srcPath,
  devtool: "cheap-module-eval-source-map",
  entry: [
    require.resolve("react-hot-loader/patch"),
    require.resolve("react-dev-utils/webpackHotDevClient"),
    "./index"
  ],
  externals: {},
  output: {
    path: buildPath,
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    crossOriginLoading: "anonymous"
  },
  resolve: {
    modules: ["node_modules", nodeModulesPath, srcPath],
    extensions: [".js", ".json", ".jsx"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: "js",
      threads: os.cpus().length,
      loaders: [
        {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              [require.resolve("babel-preset-env"), { modules: false }],
              require.resolve("babel-preset-react"),
              require.resolve("babel-preset-stage-0")
            ],
            plugins: [
              require.resolve("react-hot-loader/babel"),
              require.resolve("babel-plugin-transform-decorators-legacy"),
              [
                require.resolve("babel-plugin-transform-runtime"),
                {
                  helpers: false,
                  polyfill: false,
                  regenerator: true,
                  moduleName: path.dirname(
                    require.resolve("babel-runtime/package")
                  )
                }
              ]
            ]
          }
        }
      ]
    }),
    new HappyPack({
      id: "css",
      threads: os.cpus().length,
      loaders: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            modules: cssModules
          }
        },
        {
          loader: "postcss-loader",
          options: {
            config: {
              path: path.resolve(__dirname, "..", "postcss.config.js")
            }
          }
        }
      ]
    }),
    new HappyPack({
      id: "sass",
      threads: os.cpus().length,
      loaders: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            modules: cssModules,
            importLoaders: 1,
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        },
        {
          loader: "postcss-loader",
          options: {
            config: {
              path: path.resolve(__dirname, "..", "postcss.config.js")
            }
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }),
    new HappyPack({
      id: "less",
      threads: os.cpus().length,
      loaders: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            modules: cssModules,
            importLoaders: 1,
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        },
        {
          loader: "postcss-loader",
          options: {
            config: {
              path: path.resolve(__dirname, "..", "postcss.config.js")
            }
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true,
            javascriptEnabled: true
          }
        }
      ]
    }),
    new HtmlPlugin({ template: "./index.html" })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "happypack/loader?id=css"
      },
      {
        test: /\.(scss|sass)$/,
        use: "happypack/loader?id=sass"
      },
      {
        test: /\.less$/,
        use: "happypack/loader?id=less"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&minetype=application/octet-stream"
      },
      {
        test: /\.(jsx|js)?$/,
        use: "happypack/loader?id=js",
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ["url-loader?limit=8192"],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            noquotes: true,
            limit: 8192
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.swf$/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "..", "node_modules")]
  },
  devServer: {
    host: "127.0.0.1",
    port: "8000",
    proxy: {},
    compress: true,
    contentBase: buildPath,
    clientLogLevel: "none",
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
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

module.exports = _.merge({}, devDefaultConfig, devCustomConfig);
