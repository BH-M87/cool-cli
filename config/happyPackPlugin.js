"use strict";

const HappyPack = require("happypack");
const os = require("os");
const path = require("path");
const { customConfig } = require("./customConfig");

const { targets } = customConfig;

// threads, keep 1 thread remain for management thread
const threads = os.cpus().length - 1;

// env should be one of 'prod' and 'dev'
const getJsHappyPack = (id = "js", env) => {
  const happyPackConfig = {
    id,
    threads,
    loaders: [
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            [require.resolve("babel-preset-env"), { modules: false, targets }],
            require.resolve("babel-preset-react"),
            require.resolve("babel-preset-stage-0")
          ],
          plugins:
            env === "prod"
              ? [
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
              : [
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
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getCssHappyPack = (id = "css", env, cssModules = false) => {
  const happyPackConfig = {
    id,
    threads,
    loaders:
      env === "prod"
        ? [
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
        : [
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
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getSassHappyPack = (id = "sass", env, cssModules = false) => {
  const happyPackConfig = {
    id,
    threads,
    loaders:
      env === "prod"
        ? [
            {
              loader: "css-loader",
              query: {
                modules: cssModules,
                importLoaders: 1,
                // minimize: true, // There is not obvious change on file size after minimize.
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
              query: {
                sourceMap: true
              }
            }
          ]
        : [
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
  };
  return new HappyPack(happyPackConfig);
};

// env should be one of 'prod' and 'dev'
const getLessHappyPack = (id = "less", env, cssModules = false) => {
  const happyPackConfig = {
    id,
    threads,
    loaders:
      env === "prod"
        ? [
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
        : [
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
  };
  return new HappyPack(happyPackConfig);
};

module.exports = {
  getJsHappyPack,
  getCssHappyPack,
  getSassHappyPack,
  getLessHappyPack
};
