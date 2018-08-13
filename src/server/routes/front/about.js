// var postModal = require("../../service/post");
var msgTool = require('../../logicCheck/compile');
module.exports = function (req, res) {
    if (msgTool.isProd) {
        var _title = '关于我 | Finneen | 飞枭的博客';
        var _keywords = msgTool.key_words;
        var _desc = msgTool.desc;
        res.render('about', {
            title: _title,
            keywords: _keywords,
            desc: _desc,
            body: ''
        });
    }
};
