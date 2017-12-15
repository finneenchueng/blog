'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const pre_entry = require('../config/defined')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// baseWebpackConfig.module.rules.splice(0, 1);
var webpackConfig = {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',
  /*devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: {
      cached: false,
      colors: true
    },
    proxy: {
      "*": "http://localhost:3000" //代理中间件根目录地址,3000--中间件服务端口
    },
    contentBase: config.dev.contentBase,
    port: config.dev.port //webpack-dev 开发模式端口
  },*/
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*
    new HtmlWebpackPlugin({
      filename: 'manage.html',
      template: 'template/manage.html',
      inject: true,
      hash: true,
      chunks: ['manage', 'manifest', 'vendor'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template/index.html',
      inject: true,
      hash: true,
      chunks: ['app', 'manifest', 'vendor'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: 'template/detail.html',
      inject: true,
      hash: true,
      chunks: ['detail', 'manifest', 'vendor'],
      chunksSortMode: 'dependency'
    }),
    */
    new FriendlyErrorsPlugin()
  ]
};
for(var key in pre_entry){
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: key+'.html',
    template: 'template/'+key+'.html',
    inject: true,
    hash: true,
    chunks: [key, 'manifest', 'vendor'],
    chunksSortMode: 'dependency'
  }));

}
module.exports = merge(baseWebpackConfig,webpackConfig);
