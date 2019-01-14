# Change Log

All notable changes to this project will be documented in this file.

## What's New?

### v1.1.4  
1. Add `pkg.optimization.splitChunks` and `pkg.optimization.runtimeChunks` config when not bundling library.  
2. Remove `uglifyjs-webpack-plugin`, using `TerserWebpackPlugin` instead;

### v1.1.3  
1. Add `rules` in webpack `module` config: using `file-loader` for swf, csv, xls, xlsx, xlt, xltx, doc, docx files. PS: `/\.(swf|csv|xl[st]x?|docx?)$/i`.  
2. Fix a bug when `cool-cli -v`, should get version from cool-cli `package.json`.  
3. Add `update-notifier` to check update for `cool-cli`.  
4. Add `-s --skipupdate` to `cool-cli init` command, remove `-p --preinit`, set `true` to skip update yoeman and generator-cool.

### v1.1.2  
Add dependency `babel-eslint`.

### v1.1.1  
Fix following error:  
> Uncaught Error: Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.  
> For detail please check: http://2ality.com/2012/08/property-definition-assignment.html

### ~~v1.1.0(deprecate)~~  
`babel-loader` upgrade to `^8.0.4`.

### v1.0.2  
Update `resolveLoader` config.

### v1.0.1  
1. Change config `chunkHash` to `hashDigestLength`, default 8. Or set 0 to close the hash.  
2. Add `bundleAnalyze` config, set to `true` to active visualize size of webpack output files with an interactive zoomable treemap. Default to `false`.
3. Add `notOpenBrowser` config, set to `true` to prevent auto open browser after server start. Default `false`.

### ~~v1.0.0(deprecate)~~  
Help info complete!!!

### v0.3.1  
Add `preinit` script, to install `yoeman` and `generator-cool` before `init`.

### v0.3.0  
Add new function, `cool-cli init` to init project.

### v0.2.19  
Add `chunkHash` config to `/\.(jpe?g|png|gif)$/i` files.

### v0.2.18  
1. Support set `chunkHash` in `.cool.config.js` to config the chunkHash for bundled files (js & css).  
   Set `true` or `false` to add the chunkHash or not. Or pass a `Number` to set the number of the chunkHash.
2. Change happyPack threads to `os.cpus().length - 1`, keep 1 thread remain for management thread.

### v0.2.17  
Remove `publicPath` config in `output`, using relative path.

### v0.2.16  
Add `CopyWebpackPlugin`. Copy `static` into `build/static` when bundle the app.  
Now, can put your static files in `static`, and using it with `/static/yourFile`.

### v0.2.14  
Add another `resourceQuery` in js loader, support set `?es6` to `js` or `jsx` file to enable `babel-loader` in `node_modules` folder. Default not to use `babel-loader` in `node_modules`.

### v0.2.13  
For `.cool.dev.config.js` and `.cool.prod.config.js`, support export both function and object.  
1. Object will be treated with `_.merge` to recursively merges own and inherited enumerable string keyed properties.  
2. the default config will be passed as param of the funcion, and the modified config will be expected return from the funcion.  
  ```
  // .cool.dev.config.js or .cool.prod.config.js
  module.exports = config => {
    // Do whatever you want to modify the config
    return config;
  };
  ```

### v0.2.12  
Support set `providePluginConfig` in `.cool.config.js` to config the configuration for `ProvidePlugin`.   
Aim to automatically load modules instead of having to `import` or `require` them everywhere.

### v0.2.11  
1. Change `devConfig`, load `svg` with `file-loader` in `node_modules`.
2. Update `file-loader` version to `^2.0.0`.

### v0.2.9  
Support set `targets` configuration in `.cool.config.js` to config the targets in `babel-loader`.

### v0.2.8  
1. Support passing arguments like `--cssModules --devHtmlTemplate=index.html prodHtmlTemplate=index.html --bundleLibrary --library --libraryTarget` as well as set in `.cool.config.js`.  
2. Add new argument `bundleLibrary` to support bundle your project into library. Default `'umd'`. Also, can pass `libraryTarget` to set the value.  
3. Add new argument `library` to set the library name you want to export. Default to `name` parameter in `package.json`.  
4. Another way, set it in `.cool.prod.config.js`, change the `output` setting in webpack config can do the same.  

### v0.2.7  
When load `svg` from `node_modules`, using `file-loader`.

### v0.2.6  
1. Code refactoring, extract `happyPackPlugin` out of `devConfig.js` and `prodConfig.js`.
2. Support `devHtmlTemplate` and `prodHtmlTemplate` configurations in `.cool.config.js`, to change the template loaction and name, or even set `false` to close the `html-webpack-plugin` function. Default value is `./index.html`.
3. The last but not the least， support `resourceQuery` in loader, a condition matched with the resource query. Now you can pass `?global` to `css`, `sass`, `less` (for example, `import './index.css?global'`) to tell the loader to put them in global, not effected by css modules. Also, can pass `?external` to tell the loader to use `file-loader` instead of any `(svg-)url-loader`.
4. One more thing, add `CHANGELOG.md`.

### v0.2.5  
Using `svg-url-loader` to load svg instead of `url-loader`.

> There are some benefits for choosing utf-8 encoding over base64.
>
> 1. Resulting string is shorter (can be ~2 times shorter for 2K-sized icons);
> 2. Resulting string will be compressed better when using gzip compression;
> 3. Browser parses utf-8 encoded string faster than its base64 equivalent.

### v0.2.3  
Add `.cool.config.js` to support some customize require. For now, add `cssModules` option, set to `true` to open css modules, default value is `false`.  
```
module.exports = {
  cssModules: true,
};
```

### v0.2.2  
Fix a bug in mock data.  
From webpack-dev-server 3.0.0, the stack name changed from webpackDevMiddleware to middleware, in order to change the order of stack in app._router，put historyApiFallback after mock data listener.  

### v0.2.1  
Upgrade to Webpack v4.8.1. 

### v0.1.15  
Add console.log(chalk.magenta(`Port ${basePort} is occupied, assign new port ${port}.`)); when port is occupied.

### v0.1.14  
Import portfinder, support find new available port if the default or custom port is occupied.

### v0.1.10  
Using babel-loader on js. In case es6 code exists in js.

### v0.1.9
**Fix bug**   
Do not use style loader with ExtractTextPlugin.

### v0.1.8
**LESS Support!!!**  

### v0.1.6
**Custom Config**  
Custom Config now support!!!
Create a file named `.cool.dev.config.js` or  `.cool.prod.config.js` under root folder.
The config in them will overwrite the default webpack config recursively.


### v0.1.3
**Mock Data**  
Support mock data function. Now you can create a file `.mock.js` under root folder, and then config it as following:

```
export default {
  // support Object and Array
  'GET /api/users': { users: [1,2] },

  // GET POST can be omited
  '/api/users/1': { id: 1 },

  // support function，API refs to express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },

  // Forward to another server
  'GET /assets/*': 'https://assets.online/',

  // Forward to another server with child path
  // request /someDir/0.0.1/index.css will be proxy to https://xxx.com/page/home
  // return https://xxx.com/page/home/0.0.1/index.css
  'GET /someDir/(.*)': 'https://xxx.com/page/home',
};
```