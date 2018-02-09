# cool-cli
----
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

## Todo:
1. Support custom configuration to overwrite the default configuration.
2. Mock data support.
3. Bring in test framework.

## What's New?

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

***Happy Coding!!!***