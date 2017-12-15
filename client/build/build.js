'use strict'
//这里是将package.json中的engine要求的node，npm版本号和本地版本相比对，如果不符合就会在命令行用红色和绿色的文字发出警告
require('./check-versions')()

process.env.NODE_ENV = 'production'
  //命令行工具
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
  //配置信息
const config = require('../config')
  //载入webpacks生产环境的配置文件
const webpackConfig = require('./webpack.prod.conf')
//将静态html修改成模板文件
const checkDo = require('../config/checkEnvFromDevToProd')

//命令行提示文字
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  checkDo.modConfig(true);
    //文件操作，创建目录文件
  webpack(webpackConfig, function(err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
      checkDo.modTemplate();
    })
    //这里webpack将产生打包文件，webpack这个函数会根据配置文件生成匹配的打包文件
    //这个回调函数将结果输出在控制台上

})
