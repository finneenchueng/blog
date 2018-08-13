var doIndex = require('./front');
var doDetail = require('./front/detail');
var doAbout = require('./front/about');
var doAlbum = require('./front/album');
var doComment = require('./front/comment');
var doPreviewList = require('./front/preview');
var doArchive = require('./front/archive');
var doMngIndex = require('./admin');
var doLogin = require('./admin/login');
var doUpload = require('./admin/upload');
var doPost = require('./admin/post');
var doMngDetail = require('./admin/detail'); // 后台博文详情
var doArticleList = require('./admin/articles'); // 后台列表
module.exports = [{
    method: 'get',
    reqPath: '/',
    callback: doIndex
}, {
    method: 'get,post',
    reqPath: '/page/archives',
    callback: doArchive
}, {
    method: 'get,post',
    // reqPath: '/page/detail/:id',
    reqPath: '/page/detail',
    callback: doDetail
}, {
    method: 'get',
    reqPath: '/page/about',
    callback: doAbout
}, {
    method: 'get',
    reqPath: '/page/tag/:labelName',
    callback: doDetail
}, {
    method: 'get',
    // reqPath: '/page/album/*',
    reqPath: '/page/album/:id/:picName',
    callback: doAlbum
}, {
    method: 'get',
    reqPath: '/page/comment',
    callback: doComment
}, {
    method: 'get,post',
    reqPath: '/page/preview',
    callback: doPreviewList
}, {
    method: 'get',
    reqPath: '/mng',
    callback: doMngIndex
}, {
    method: 'get,post',
    reqPath: '/mng/login',
    callback: doLogin
}, {
    method: 'get,post',
    reqPath: '/mng/upload',
    callback: doUpload
}, {
    method: 'post',
    reqPath: '/mng/post',
    callback: doPost
}, {
    method: 'get,post',
    reqPath: '/mng/detail',
    callback: doMngDetail
}, {
    method: 'get,post',
    reqPath: '/mng/list',
    callback: doArticleList
}];
