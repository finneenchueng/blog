var postModal = require('../../service/post');
var categoryModal = require('../../service/category');
var timeUtil = require('../../logicCheck/timeUtil');
var msgTool = require('../../logicCheck/compile');
var modSessionOpt = function (req) {
    postModal.getPostPreviewListByPageNum({
        pageNum: 1,
        pageSize: 5
    }, function (result) {
        var outputOpt = {
            data: result
        };
        postModal.getCount(function (count) {
            outputOpt.count = count;
            var body_data = msgTool.outputJsonResultWithCompile(outputOpt);
            req.session.previewOpt = body_data;
        });

    });
    postModal.getArchiveList(function (result) {
        var outputOpt = {
            data: result
        };
        var _data = msgTool.outputJsonResultWithCompile(outputOpt);
        req.session.archiveListOpt = _data;
    });
};
var getUUID4PostId = function (len) {
    var tmp_id = null;
    try {
        var date_opt = timeUtil.getCurrentDate();
        var resultCode = msgTool.getEncryptCodeByMD5(date_opt.dateContent, Math.floor(Math.random() * 10));
        if (len == undefined) {
            len = 14;
        } else {
            if (len < 14) {
                len = 14;
            } else if (len > resultCode.length) {
                len = resultCode.length;
            }
        }
        var key_len = (date_opt.key + '').length;
        tmp_id = key_len + resultCode.substr(key_len, len - key_len) + date_opt.key;
    } catch (e) {
        console.log(e);
        return null;
    }
    return tmp_id;
};
module.exports = function (req, res, next) {
    var param_key = req.body[msgTool.outerParamKey];
    // console.log(param_key)
    param_key = param_key == undefined ? null : param_key;
    if (param_key != null) {
        param_key = msgTool.parseJsonResult(param_key);
        if (param_key == null) {
            param_key = {};
        }
    }
    var postId = param_key.postId;
    var postType = param_key.postType;
    var postData = param_key.postData;
    var postIndex = param_key.index;
    postId = postId == undefined ? null : postId;
    postType = postType == undefined ? null : postType;
    postData = postData == undefined ? null : postData;
    postIndex = postIndex == undefined ? null : postIndex;
    // console.log("request data:"+postData)
    try {
        if (typeof postData === 'string') {
            postData = JSON.parse(postData);
        }
    } catch (e) {
        // console.log(postData)
        console.log(e);
    }
    var userOpt = req.session.user;
    // console.log("request typecode:"+postType)
    // console.log(postData)
    // console.log(postId)
    if (postType == null) {
        if (postId == null) {
            // console.log('going to  get postId')
            var result = {
                postId: getUUID4PostId(14),
                isAdd: true
            };
            req.session.postOpt = result;
            var tmp_opt = {
                data: result,
                cateOpt: req.session.categoryOpt
            };
            if (req.session.categoryOpt == undefined) {
                categoryModal.getCategoryList({}, function (cate_result) {
                    req.session.categoryOpt = cate_result;
                    tmp_opt.cateOpt = req.session.categoryOpt;
                    res.json(msgTool.outputJsonResultWithCompile(tmp_opt));
                });
            } else {
                res.json(msgTool.outputJsonResultWithCompile(tmp_opt));
            }

        } else {
            postModal.getDetailByPostId({
                postId: postId
            }, function (result) {
                // var result = {
                // 	success: false
                // };
                // console.log(result)
                // if (result == 1) {
                // 	result.success = true;
                // }
                req.session.postOpt = {
                    postId: result.postId
                };
                var tmp_opt = {
                    data: result,
                    cateOpt: req.session.categoryOpt
                };
                tmp_opt.data.isAdd = false;
                if (req.session.categoryOpt == undefined) {
                    categoryModal.getCategoryList({}, function (cate_result) {
                        req.session.categoryOpt = cate_result;
                        tmp_opt.cateOpt = req.session.categoryOpt;
                        res.json(msgTool.outputJsonResultWithCompile(tmp_opt));
                    });
                } else {
                    res.json(msgTool.outputJsonResultWithCompile(tmp_opt));
                }
            });
        }
    } else if (postType == 0) {
        if (postData != null) {
            // console.log(postData)
            // console.log('传参。。。。。。')
            // console.log(postData.title);
            if (postData.title == null || postData.title == '') {
                res.json(msgTool.outputJsonResultWithCompile({
                    success: false,
                    msg: ' 博文标题不能为空！'
                }));
                return;
            }
            postData.createTime = timeUtil.getCurrentDateTimeString();
            postData.author = userOpt.uName;
            postModal.addPostBlog(postData, function (result) {
                var msgOpt = {
                    success: false,
                    msg: '新增失败！'
                };

                if (result.result.ok) {
                    req.session.postOpt = undefined;
                    msgOpt = {
                        success: true,
                        msg: '新增成功！'
                    };
                    modSessionOpt(req);
                }
                res.json(msgTool.outputJsonResultWithCompile(msgOpt));
                // console.log(result)
                // req.session.postOpt = {
                // 	postId: result.postId
                // };
                // res.json(JSON.stringify(result))
            });
        }

    } else if (postType == 1) {
        if (postData != null) {
            if (postIndex == null) {
                if (postData.title == null || postData.title == '') {
                    res.json(msgTool.outputJsonResultWithCompile({
                        success: false,
                        msg: ' 博文标题不能为空！'
                    }));
                    return;
                }
            }

            postData.lastModified = timeUtil.getCurrentDateTimeString();
            postModal.updateByParams(postData, {
                postId: postData.postId
            }, function (result) {
                // var result = {
                // 	success: false
                // };
                // console.log(result)
                // if (result == 1) {
                // 	result.success = true;
                // }
                var msgOpt = {
                    success: false,
                    msg: '修改失败！'
                };
                if (result.result.ok) {
                    req.session.postOpt = undefined;
                    msgOpt = {
                        success: true,
                        msg: '修改成功！'
                    };
                    modSessionOpt(req);
                }
                res.json(msgTool.outputJsonResultWithCompile(msgOpt));
                // result.insertedCount:
                // console.log(result)
                // req.session.postOpt = {
                // 	postId: result.postId
                // };
                // res.json(JSON.stringify(result))
            });
        }
    } else if (postType == 2) {
        if (postData != null) {
            postModal.delPostById({
                postId: postData.postId
            }, function (result) {
                var msgOpt = {
                    success: false,
                    msg: '删除失败！'
                };
                if (result == null) {

                } else {
                    req.session.postOpt = undefined;
                    msgOpt = {
                        success: true,
                        msg: '删除成功！'
                    };
                    modSessionOpt(req);
                }
                // console.log(msgOpt)
                res.json(msgTool.outputJsonResultWithCompile(msgOpt));
            });
        }
    }
};
