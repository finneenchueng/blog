'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
//一个用来打开网页、文件、可执行文件的模块
const opn = require('opn')
const path = require('path')
const express = require('express')
  //资源打包模块
const webpack = require('webpack')
  //服务器中间件，匹配对应请求的的URL地址, 匹配的请求将被代理到目标主机
const proxyMiddleware = require('http-proxy-middleware')
//将静态html修改成模板文件
const checkDo = require('../config/checkEnvFromDevToProd')
  /*
  //在大型项目中，可能 webpack.config.js 会变得越来越臃肿，这个时候可以
  //利用做 webpack-merge 插件。将配置定义在一个目录下面的不同文件中
  //然后通过 webpack-merge 来合并成最终的配置。
  */
// console.log(process.env.NODE_ENV)
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production') ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
  // automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  //代理表，可以将复杂的url简写
const proxyTable = config.dev.proxyTable

const app = express()
  //实例化一个compiler
const compiler = webpack(webpackConfig,function(err, stats) {
  if (err) throw err
  checkDo.modConfig(false);
})

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })
  // force page reload when html-webpack-plugin template changes
  // currently disabled until this is resolved:
  // https://github.com/jantimon/html-webpack-plugin/issues/680
  // compiler.plugin('compilation', function (compilation) {
  //   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
  //     hotMiddleware.publish({ action: 'reload' })
  //     cb()
  //   })
  // })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
      // when env is testing, don't need open it
      // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      //   opn(uri)
      // }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
