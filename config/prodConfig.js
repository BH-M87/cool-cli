"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const {
  srcPath,
  buildPath,
  distPath,
  nodeModulesPath,
  staticPath
} = require("./paths");
const {
  packageJsonConfig,
  customConfig,
  prodCustomConfig,
  providePluginConfig
} = require("./customConfig");
const {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
} = require("./happyPackPlugin");

const {
  cssModules = false,
  prodHtmlTemplate = "./index.html",
  bundleLibrary = false,
  library = packageJsonConfig.name,
  libraryTarget
} = customConfig;

const prodDefaultConfig = {
  mode: "production",
  bail: true,
  context: srcPath,
  devtool: false,
  entry: "./index",
  externals: {},
  output: bundleLibrary
    ? {
        path: distPath,
        filename: "[name].js",
        chunkFilename: "[name].js",
        crossOriginLoading: "anonymous",
        library,
        libraryTarget:
          libraryTarget || (bundleLibrary === true ? "umd" : bundleLibrary)
      }
    : {
        path: buildPath,
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        crossOriginLoading: "anonymous"
      },
  resolve: {
    modules: ["node_modules", nodeModulesPath, srcPath],
    extensions: [".js", ".json", ".jsx"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]${bundleLibrary ? "" : ".[hash:8]"}.css`
    }),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: false
    }),
    getJsHappyPack("js", "prod"),
    getCssHappyPack("css", "prod", cssModules),
    getSassHappyPack("sass", "prod", cssModules),
    getLessHappyPack("less", "prod", cssModules),
    getCssHappyPack("cssGlobal", "prod"),
    getSassHappyPack("sassGlobal", "prod"),
    getLessHappyPack("lessGlobal", "prod")
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
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=cssGlobal"]
          },
          {
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=css"]
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=sassGlobal"]
          },
          {
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=sass"]
          }
        ]
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=lessGlobal"]
          },
          {
            use: [MiniCssExtractPlugin.loader, "happypack/loader?id=less"]
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
        use: "file-loader"
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
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
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
            context: srcPath,
            name: "[path][name].[hash:12].[ext]"
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
  }
};

// from user config
if (prodHtmlTemplate) {
  prodDefaultConfig.plugins.push(
    new HtmlPlugin({ template: prodHtmlTemplate })
  );
}
if (providePluginConfig) {
  prodDefaultConfig.plugins.push(
    new webpack.ProvidePlugin(providePluginConfig)
  );
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

module.exports = _.isFunction(prodCustomConfig)
  ? prodCustomConfig(prodDefaultConfig)
  : _.merge({}, prodDefaultConfig, prodCustomConfig);
