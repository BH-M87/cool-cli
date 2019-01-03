# cool-cli  
![npm version](https://img.shields.io/npm/v/cool-cli.svg?style=flat)  ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)  

[中文版](https://github.com/RJAVA1990/cool-cli/blob/master/README_zh-CN.md)

## Install  
`npm install cool-cli`

## What?  
A cool cli, with independent webpack config, for building app in a simple way.

## Why?  
We usually put our webpack configuration in our own project with popular project generator. After hundreds of projects, we config or update the webpack configuration hundreds of times. So I want to do it in a simple and cool way. Seperate all the webpack configutation out of the project, nothing to worry about webpack config anymore.

## How?  
1. First, support `npm start` and `npm run build`. Used for dev and prod environment.
2. Besides basic configuration, import `happypack` to improve building speed.
3. Other optimization.

## Usage  
1. `cool-cli`
   > Options:
   >
   >   -V, --version  output the version number
   >
   >   -h, --help       output usage information

2. `cool-cli init`
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

3. `cool-cli preinit`

   > Options:
   >
   >   -V, --version  output the version number
   >
   >   -h, --help       output usage information
   >
   >   -c, --cnpm      install yoeman and generator-cool using cnpm, default npm
   >
   >   -t, --tnpm       install yoeman and generator-cool using tnpm, default npm

4. `cool-cli start`
   > Options:
   > 
   >   -V, --version                output the version number
   > 
   >   -h, --help                     output usage information
   > 
   >   --cssModules              turn on the css modules, default to false
   > 
   >   --devHtmlTemplate   change the dev template loaction and name,
   > ​                                       or even set false to close the html-webpack-plugin function
   > 
   >   --bundleLibrary          bundle your project into library
   > 
   >   --library                        set the library name you want to export
   > 
   >   --libraryTarget             set the libray target type, default 'umd'
   >
   >   --notOpenBrowser     not open browser after server start

5. `cool-cli build`
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
   >   --bundleAnalyze           visualize size of webpack output files with an interactive zoomable treemap, default false

***Happy Coding!!!***