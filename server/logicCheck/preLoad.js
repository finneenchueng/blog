var util = require('util');
var config = require('./config');
var entry = require('../routes');
var msgTool = require("./compile");
var logConfig = require('./log');
var pre_match = {
	'get': function(app, item) {
		app.get(item.reqPath, item.callback);
	},
	'post': function(app, item) {
		app.post(item.reqPath, item.callback);
	}
};

function setPreDataToSession(req, next) {
	var postModal = require("../service/post");
	if (msgTool.isProd) {
		if (req.session.previewOpt == undefined) {
			postModal.getArchiveList(function(result) {
				var outputOpt = {
					data: result
				};
				req.session.archiveListOpt = msgTool.outputJsonResultWithCompile(outputOpt)
			});
			postModal.getPostPreviewListByPageNum({
				pageNum: 1,
				pageSize: 5
			}, function(result) {
				var outputOpt = {
					data: result
				};
				req.session.previewOpt = msgTool.outputJsonResultWithCompile(outputOpt);
			});
		}

	}

}
module.exports = function(app, router) {
	//配置取参规则
	router.param(['id', 'labelName', 'picName'], function(req, res, next, value) {
		// console.log('CALLED ONLY ONCE with', value);
		// setPreDataToSession(req);

		next();
	})
	logConfig.regularRecord(app);
	router.all('*', function(req, res, next) {
		//记录所有post请求参数及内容详情
		logConfig.postParamsRecord(req);
		next();
	})
	router.all('/mng/*', function(req, res, next) {
		// console.log(req.method)
		var flag = true;
		var target_url = '/mng/login';
		if (req.method == 'POST') {
			if (req.originalUrl != target_url) {
				if (req.session.user == undefined) {
					// console.log('还未登录');
					var result = msgTool.outputJsonResultWithCompile({
						success: false,
						msg: "当前回话已失效，请重新登录"
					});
					res.status(800).end(result);
					flag = false;
				}
			}

		} else if (req.method == 'GET') {
			if (req.originalUrl != target_url) {
				if (req.session.user == undefined) {
					flag = false;
					res.redirect(target_url);
				}
			}

		}
		if (flag) {
			next();
		}

	});

	// var setHeader = function(err, req, res, next) {
	// 	res.header('X-Powdered-By', 'finneen.cn');
	// 	res.header('x-powered-by', 'finneen.cn');
	// 	res.header("Content-Type", "application/json;charset-utf-8");
	// 	next();
	// }
	// app.use(setHeader);
	
	// router.param(function(param, option) {
	// 	return function(req, res, next, val) {
	// 		console.log(param)
	// 		console.log(req.session.user)
	// 		if (val == option) {
	// 			next();
	// 		} else {
	// 			res.sendStatus(403);
	// 		}
	// 	}
	// });
	if (util.isArray(entry)) {
		var config_len = entry.length;
		for (var k = 0; k < config_len; k++) {
			var item = entry[k];
			var _method = item.method;
			if (_method.indexOf(',') > -1) {
				var tmparr = _method.split(',');
				for (var j = 0; j < tmparr.length; j++) {
					var new_method = tmparr[j];
					pre_match[new_method](app, item);
				}
			} else {
				pre_match[_method](app, item);
			}
		}
	}

	app.use(router);

};