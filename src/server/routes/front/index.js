var postModal = require('../../service/post');
var msgTool = require('../../logicCheck/compile');
module.exports = function (req, res, next) {
    var _title = '首页 | Finneen | 飞枭的博客';
    var _keywords = msgTool.key_words;
    var _desc = msgTool.desc;
    // console.log(req.session.previewOpt)
    if (req.session.previewOpt == undefined) {
        postModal.getPostPreviewListByPageNum({
            pageNum: 1,
            pageSize: 5
        }, function (result) {
            var outputOpt = {
                data: result
            };
            postModal.getCount(function (count) {
                outputOpt.count = count;
                // console.log(outputOpt)
                var body_data = msgTool.outputJsonResultWithCompile(outputOpt);
                req.session.previewOpt = body_data;
                // console.log(body_data)
                res.render('index', {
                    title: _title,
                    keywords: _keywords,
                    desc: _desc,
                    body: body_data
                });
            });
        });
    } else {
        res.render('index', {
            title: _title,
            keywords: _keywords,
            desc: _desc,
            body: req.session.previewOpt
        });
    }
};
