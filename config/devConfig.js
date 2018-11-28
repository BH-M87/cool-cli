"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const { srcPath, buildPath, nodeModulesPath, staticPath } = require("./paths");
const { customConfig, devCustomConfig } = require("./customConfig");
const {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
} = require("./happyPackPlugin");

const {
  cssModules = false,
  devHtmlTemplate = "./index.html",
  providePluginConfig
} = customConfig;

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
    crossOriginLoading: "anonymous"
  },
  resolve: {
    modules: ["node_modules", nodeModulesPath, srcPath],
    extensions: [".js", ".json", ".jsx"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    getJsHappyPack("js", "dev"),
    getCssHappyPack("css", "dev", cssModules),
    getSassHappyPack("sass", "dev", cssModules),
    getLessHappyPack("less", "dev", cssModules),
    getCssHappyPack("cssGlobal", "dev"),
    getSassHappyPack("sassGlobal", "dev"),
    getLessHappyPack("lessGlobal", "dev")
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        oneOf: [
          {
            resourceQuery: /es6/,
            use: "happypack/loader?id=js"
          },
          {
            use: "happypack/loader?id=js",
            exclude: /node_modules/
          }
        ]
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /global/,
            use: "happypack/loader?id=cssGlobal"
          },
          {
            use: "happypack/loader?id=css"
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /global/,
            use: "happypack/loader?id=sassGlobal"
          },
          {
            use: "happypack/loader?id=sass"
          }
        ]
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /global/,
            use: "happypack/loader?id=lessGlobal"
          },
          {
            use: "happypack/loader?id=less"
          }
        ]
      },
      {
        test: /\.*$/,
        resourceQuery: /external/,
        loader: "file-loader"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            context: srcPath,
            minetype: "application/font-woff"
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            context: srcPath,
            minetype: "application/octet-stream"
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: "file-loader"
        },
        include: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            context: srcPath
          }
        },
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
