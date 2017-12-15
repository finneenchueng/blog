var userModal = require("../../service/user");
var msgTool = require("../../logicCheck/compile");
module.exports = function(req, res, next) {
	var param_key = req.body[msgTool.outerParamKey];
	// console.log(param_key)
	param_key = param_key == undefined ? null : param_key;
	param_key = msgTool.parseJsonResult(param_key);
	if (param_key == null) {
		param_key = {};
	}
	if (typeof param_key === 'string') {
		param_key = JSON.parse(param_key);
	}
	// console.log(param_key)
	var uname = param_key.usrname;
	var upwd = param_key.usrpwd;
	uname = uname == undefined ? '' : uname;
	upwd = upwd == undefined ? '' : upwd;
	var _title = "登录 | Finneen | 飞枭的博客";
	var _keywords = msgTool.key_words;
	var _desc = msgTool.desc;
	var loginJump = function(flag, res) {
		if (flag) {
			// if(msgTool.isProd){
			// 	res.redirect("/mng");
			// }else{

			// }
			res.redirect("/mng");
		} else {
			var loginJson = {
				title: _title,
				keywords: _keywords,
				desc: _desc,
				body: ''
			};
			res.render('login', loginJson);
		}
	}
	if (req.method == 'get' || req.method == 'GET') {
		loginJump(req.session.user != undefined, res);
	} else if (req.method == 'post' || req.method == 'POST') {
		var outputOpt = {
			success: false,
			msg: ''
		};
		if (uname == '' || upwd == '') {
			outputOpt.msg = "用户名或密码不能为空！";
			res.json(msgTool.outputJsonResultWithCompile(outputOpt))
		} else {
			userModal.queryUserByUnameAndPwd({
				uName: uname
			}, function(result) {
				if (result == null) {
					outputOpt.msg = "用户名或密码错误！";
				} else {
					var _time = result.createTime;
					var _pwd = result.uPwd;
					var _uid = result.uId;
					var cur_upwd = msgTool.getEncryptAes256cbcCode(upwd, _time);
					if (_pwd == cur_upwd) {
						outputOpt = {
							success: true,
							msg: '登录成功！',
							usrname: uname
						};
						req.session.user = {
							uID: _uid,
							uName: result.uName
						}
					} else {
						outputOpt.msg = "用户名或密码错误！";
					}
				}
				res.json(msgTool.outputJsonResultWithCompile(outputOpt));

			});
		}
	}



};