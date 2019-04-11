# cool-cli

![npm version](https://img.shields.io/npm/v/cool-cli.svg?style=flat)  ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

[English](https://github.com/RJAVA1990/cool-cli/blob/master/README.md)

## 安装  
`npm install cool-cli`

## 简介  
一个简单又很酷的cli（命令行界面），集成独立完整的webpack配置，简单的初始化开发打包发布应用。

## 背景  
我们经常把我们的webpack配置放在自己的项目里面，业务逻辑和构建工具混杂在一起，一点也不优雅。所以我想用一个简单的方式，从项目中抽离所有的webpack构建配置，不再浪费时间在打包配置上。

## 使用方法  

**<u>cool-cli支持命令行交互式帮助信息提示，如果有任何不清楚的地方，加上`-h`参数就能得到你想要的提示。</u>**

命令：

1. `cool-cli`
   > 输出帮助信息，查看版本信息
   > 
   > Options:
   >
   >   -V, --version  output the version number
   >
   >   -h, --help       output usage information

2. `cool-cli init`
   > 一键生成新项目
   > 
   > Options:
   >
   >   -V, --version          output the version number
   >
   >   -h, --help               output usage information
   >
   >   -s, --skipupdate    skip update yoeman and generator-cool
   >
   >   -c, --cnpm              install yoeman and generator-cool using cnpm, default npm
   >
   >   -t, --tnpm               install yoeman and generator-cool using tnpm, default npm
   >
   >   --template             use your own yoeman generator as you wish

3. `cool-cli preinit`
   > 全局安装一键生成新项目的前置依赖，`yo` & `generator-cool`
   > 
   > Options:
   >
   >   -V, --version  output the version number
   >
   >   -h, --help       output usage information
   >
   >   -c, --cnpm      install yoeman and generator-cool using cnpm, default npm
   >
   >   -t, --tnpm       install yoeman and generator-cool using tnpm, default npm
   >
   >   --template     use your own yoeman generator as you wish

4. `cool-cli start`
   > 启动`webpack dev server`，本地开发环境使用，集成`.mock.js`，支持内置的mock数据提供
   >
   > Options:
   >
   >   -V, --version                output the version number
   >  
   >   -h, --help                     output usage information
   >  
   >   --cssModules              turn on the css modules, default to false
   >  
   >   --devHtmlTemplate   change the dev template loaction and name,
   >   ​                                        or even set false to close the html-webpack-plugin function
   >  
   >   --bundleLibrary          bundle your project into library
   >  
   >   --library                        set the library name you want to export
   >  
   >   --libraryTarget             set the libray target type, default 'umd'
   >  
   >   --notOpenBrowser     not open browser after server start
   >  
   >   --publicPath                 webpack config: publicPath in output
   >  
   >   --typescript or --ts       enable TypeScript support

5. `cool-cli build`
   > 打包发布，支持打包成生产环境部署包，或者加上`library`参数，打包发布成npm独立包。
   > 
   > Options:
   >   -V, --version                  output the version number
   > 
   >   -h, --help                       output usage information
   > 
   >   --cssModules                turn on the css modules, default to false
   > 
   >   --prodHtmlTemplate   change the prod template loaction and name,
   > ​                                          or even set false to close the html-webpack-plugin function
   > 
   >   --bundleLibrary            bundle your project into library
   > 
   >   --library                          set the library name you want to export
   > 
   >   --libraryTarget               set the libray target type, default 'umd'
   > 
   >   --hashDigestLength     pass a Number to set the number of the chunkHash, or set 0 to close the hash
   >
   >   --bundleAnalyze           visualize size of webpack output files with an interactive 
   >
   >   --publicPath                  webpack config: publicPath in output
   >
   >   --typescript or --ts        enable TypeScript support

***Happy Coding!!!***