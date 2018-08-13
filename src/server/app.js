var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var compression = require('compression');
var intialDatabase = require('./db/install');
intialDatabase();
var check404 = require('./logicCheck/404');
var check500 = require('./logicCheck/500');
var sessionCode = require('./logicCheck/sessionid');

var doRouteConfig = require('./logicCheck/preLoad');
// var util = require('util');
// 加载hbs模块
var hbs = require('hbs');
var app = express();
var router = express.Router();
var session_id = sessionCode();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);
// 设置gzip传输
app.use(compression());
// 取消头部X-powered-by属性显示
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));
// 设置post body数据的大小
app.use(bodyParser.json({
    limit: '15mb'
}));

// console.log(session_id)
app.use(cookieParser(session_id));
app.use(session({
    secret: session_id, // 与cookieParser中的一致
    name: 'finneen', // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 30 * 60 * 1000
    }, // 设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: true,
    saveUninitialized: true
}));
// 设置静态访问目录，而无需经过过滤器等验证判断（一般属于一些脚本样式或无需逻辑判断的展示页面等）
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', index);
// app.use('/users', users);

doRouteConfig(app, router);

// catch 404 and forward to error handler
app.use('/404', check404);
// app.use('/404', check404);
// error handler
app.use('/500', check500);
// app.use(check404);
// app.use(check500);
app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, './public/404/index.html'));
});
app.post('*', function (req, res) {
    res.status(404).end('{error: "the request url is not found!"}');
});
module.exports = app;
