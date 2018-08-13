var postModal = require('../../service/post');
var msgTool = require('../../logicCheck/compile');
var page404 = require('../../logicCheck/404');

module.exports = function (req, res, next) {
    var callback = null;
    var param_key = null;
    var checkPostId = function (postId) {
        var flag = false;
        if (typeof postId === 'string') {
            var chk_len = postId.substring(0, 1);
            if (msgTool.isNumber(chk_len)) {
                var chk_end_str = postId.substr(-chk_len);
                if (msgTool.isNumber(chk_end_str)) {
                    flag = true;
                }
            }
        }
        return flag;
    };
    if (msgTool.isProd) {
        var _title = ' | Finneen | 飞枭的博客';
        var _keywords = msgTool.key_words;
        var _desc = msgTool.desc;
        param_key = req.params.labelName;
        // console.log(param_key)
        if (!checkPostId(param_key)) {
            page404(req, res, next);
            return;
        }
        msgTool.isNumber(param_key);
        if (param_key != null) {
            param_key = {
                postId: param_key
            };
        }
        callback = function (resData, titleKey) {
            res.render('detail', {
                title: titleKey + _title,
                keywords: _keywords,
                desc: _desc,
                body: resData
            });
        };
    } else {
        param_key = req.body[msgTool.outerParamKey];
        param_key = param_key == undefined ? null : param_key;
        if (param_key != null) {
            param_key = msgTool.parseJsonResult(param_key);
            if (param_key == null) {
                param_key = {};
            }
        }
        callback = function (resData) {
            res.json(resData);
        };
    }
    postModal.getDetailByParam(param_key, function (result) {
        var outputOpt = {
            data: result
        };
        // console.log(result)
        if (result == null) {
            page404(req, res, next);
        } else {
            callback(msgTool.outputJsonResultWithCompile(outputOpt), result.keyWords);
        }
    });
};
