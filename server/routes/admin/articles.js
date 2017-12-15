var postModal = require("../../service/post");
var msgTool = require("../../logicCheck/compile");
var categoryModal = require("../../service/category");
module.exports = function(req, res, next) {
	var param_key = {};
	// var param_key = req.body[msgTool.outerParamKey];
	// param_key = param_key == undefined ? null : param_key;
	// console.log(param_key)
	// if (param_key != null) {
	// 	param_key = msgTool.parseJsonResult(param_key);
	// 	console.log(param_key)
	// 	if (param_key == null) {
	// 		param_key = {};
	// 	}
	// } else {
	// 	param_key = {};
	// }
	// console.log(param_key)
	var appendTypeName = function(opt) {
		var cateOpt = opt.cateOpt;
		var _data = opt.data;
		var _arr = [];
		_data.forEach(function(item, i) {
			var tmp_opt = item;
			cateOpt.forEach(function(opt_item, j) {
				if (opt_item.cateId == tmp_opt.type) {
					tmp_opt.typeName = opt_item.cateName;
					return false;
				}
			});
			_arr.push(tmp_opt);
		});
		opt.data=_arr;
		return opt;
	}
	postModal.getPostListWithDetail(param_key, function(result) {
		var opt = {
			data: result,
			cateOpt: req.session.categoryOpt
		}
		if (req.session.categoryOpt == undefined) {
			categoryModal.getCategoryList({}, function(cate_result) {
				req.session.categoryOpt = cate_result;
				opt = {
						data: result,
						cateOpt: cate_result
					}
					// req.session.categoryOpt = msgTool.outputJsonResultWithCompile(cate_result);
				
				opt=appendTypeName(opt);
				res.json(msgTool.outputJsonResultWithCompile(opt))
			});
		} else {
			opt=appendTypeName(opt);
			res.json(msgTool.outputJsonResultWithCompile(opt))
		}

		// res.json(JSON.stringify(result))
	});
	// res.send('this is a mng articles api!');
};