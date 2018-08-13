var postModal = require('../../service/post');
var msgTool = require('../../logicCheck/compile');
//后台博文详情
module.exports = function (req, res, next) {
    var param_key = req.body[msgTool.outerParamKey];
    param_key = param_key == undefined ? null : param_key;
    if (param_key != null) {
        param_key = msgTool.parseJsonResult(param_key);
        if (param_key == null) {
            param_key = {};
        }
    } else {
        param_key = {};
    }
    var postId = param_key.postId;
    postId = postId == undefined ? null : postId;
    if (postId == null) {
        var result = {
            postId: msgTool.getRandomSerialNumber(14)
        };
        res.json(msgTool.outputJsonResultWithCompile(result));
    } else {
        postModal.getDetailByParams({
            post_id: postId
        }, function (result) {
            // var result = {
            // 	success: false
            // };
            // console.log(result)
            // if (result == 1) {
            // 	result.success = true;
            // }
            // console.log(result)
            res.json(msgTool.outputJsonResultWithCompile(result));
        });
    }
};
