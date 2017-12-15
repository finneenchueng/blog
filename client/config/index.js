'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const pre_entry = require('./defined')
var option= {
    build: {
        env: require('./prod.env'),
        // index: path.resolve(__dirname, '../../server/public/dist/index.html'),
        // manage: path.resolve(__dirname, '../../server/public/dist/manage.html'),
        assetsRoot: path.resolve(__dirname, '../../server/public'),
        assetsSubDirectory: 'dist',
        assetsPublicPath: '/',
        // productionSourceMap: true,
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: process.env.PORT || 8081,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../'),
        // proxyTable: {},
        proxyTable: {
            // '**': 'http://127.0.0.1:3000'

            // "/+^(\.html)+$/": 'http://127.0.0.1:3000' //匹配所有非html的请求接口进入代理响应
            '/mng':{
              target:'http://localhost:3000',
              // filter:"^(\.html)",
              changeOrigin:true,
              secure:false
            },
            '/page':{
              target:'http://localhost:3000',
              // filter:"^(\.html)",
              changeOrigin:true,
              secure:false
            }
        }, //单线程node.js代理中间件，用于连接，快速和浏览器同步
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    }
}

for(var key in pre_entry){
  option.build[key]=path.resolve(__dirname, '../../server/public/dist/'+key+'.html');
}
module.exports = option
