# client

> this is a front package by vue library

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 简介 Intro 
this is a Blog website source  by nodejs!

这是一个简易的博客系统，后台采用node实现！

server目录---后台服务代码；

client目录---前台实现源代码；

为了方便使用，以及需要安装依赖包，本版本所有相关的依赖包都已上传到github；

您可以直接下载或远程克隆到本地就可以直接运行了

# 运行前的准备 

运行前您需要本地安装mongodb数据库，并新建一个数据库blog；

找到/server/db/collectionSql.js,新建各自集合并插入初始数据；

如果您想自定义数据库名，可以在server/db/config.js 文件下修改dbName字段即可；

开发模式下，后端默认端口3001；前端webpack-server默认端口8081；


# 安装 Installation

### Npm
开发环境：
```bash
cd client
npm run start
```
前端运行开发测试，利用webpack-server做中间件，也即代理真正逻辑接口

如需打包成生产环境：

```bash
npm run build
```
页面被放置到server/views目录下；

js和css放置在server/public/dist下

如果想部署到远端服务器上，打包完成后将server目录拷贝到服务器上运行即可

```bash
cd server
npm run start
```