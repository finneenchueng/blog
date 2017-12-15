var msgTool = require("../../logicCheck/compile");
module.exports = function(req, res, next) {
	var _title = "博客后台编辑 | Finneen | 飞枭的博客";
	var _keywords = msgTool.key_words;
	var _desc = msgTool.desc;
	var target_url = '/mng/login';
	if (req.session.user == undefined) {
		res.redirect(target_url);
	} else {
		res.render('manage', {
			title: _title,
			keywords: _keywords,
			desc: _desc,
			body: ""
		});
	}

};