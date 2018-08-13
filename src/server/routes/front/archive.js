var postModal = require('../../service/post');
var cateModal = require('../../service/category');
var msgTool = require('../../logicCheck/compile');
module.exports = function (req, res) {
    // console.log(msgTool.isProd)
    // console.log(req.session.archiveListOpt)
    if (msgTool.isProd) {
        var _title = '归档列表 | Finneen | 飞枭的博客';
        var _keywords = msgTool.key_words;
        var _desc = msgTool.desc;
        if (req.session.archiveListOpt == undefined) {
            postModal.getAllPostList(function (result) {
                var outputOpt = {
                    data: []
                };
                var new_result = [];
                cateModal.getCategoryList({}, function (data) {
                    if (data != null) {
                        var cateLen = data.length;
                        var postLen = result.length;
                        for (var k = 0; k < cateLen; k++) {
                            var cur_opt = data[k];
                            cur_opt.children = [];
                            for (var j = 0; j < postLen; j++) {
                                var post_item = result[j];
                                if (cur_opt.cateId == post_item.type) {
                                    cur_opt.children.push(post_item);
                                }
                            }
                            new_result.push(cur_opt);
                        }
                        outputOpt.data = new_result;
                        var _data = msgTool.outputJsonResultWithCompile(outputOpt);
                        req.session.archiveListOpt = _data;
                        // console.log(msgTool.parseJsonResult(_data));
                        res.render('archives', {
                            title: _title,
                            keywords: _keywords,
                            desc: _desc,
                            body: _data
                        });
                    }
                });
            });
        } else {
            res.render('archives', {
                title: _title,
                keywords: _keywords,
                desc: _desc,
                body: req.session.archiveListOpt
            });
        }
    } else {
        postModal.getArchiveList(function (result) {
            var outputOpt = {
                data: result
            };
            res.json(msgTool.outputJsonResultWithCompile(outputOpt));
        });
    }
};
